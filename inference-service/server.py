from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import librosa
import numpy as np
import noisereduce as nr
import tensorflow as tf
from tensorflow import keras
import os
import tempfile
import logging
from contextlib import asynccontextmanager
import asyncio
from concurrent.futures import ThreadPoolExecutor
import uvicorn

# logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# config
MODEL_PATH = "kicau_model.h5"
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

model = None
executor = ThreadPoolExecutor(max_workers=4)

# classname burung
class_names = [
    "bobfly1", "ducfly", "brratt1", "barant1", "squcuc1",
    "greant1", "bubwre1", "oliwoo1", "fepowl", "butwoo1"
]

class PredictionResponse(BaseModel):
    ebird_code: str
    confidence: float
    processing_time: float

def denoise_audio(audio_array, sampling_rate):
    return nr.reduce_noise(y=audio_array, sr=sampling_rate)

def pad_or_trim(audio_array, sampling_rate, max_len):
    desired_len = int(max_len * sampling_rate)
    if len(audio_array) < desired_len:
        audio_array = np.pad(audio_array, (0, desired_len - len(audio_array)))
    else:
        audio_array = audio_array[:desired_len]

    return audio_array

def to_melspectrogram(audio_array, sampling_rate=16_000, n_mels=40):
    mel_spec = librosa.feature.melspectrogram(y=audio_array, sr=sampling_rate, n_mels=n_mels)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    mel_spec_db = mel_spec_db.astype(np.float32)
    mel_spec_db = mel_spec_db[..., np.newaxis]

    return mel_spec_db

def preprocess_audio_data(audio_array, original_sampling_rate, target_sampling_rate=16_000, max_len=5):
    """Preprocess audio data from memory"""
    # resample if needed
    if original_sampling_rate != target_sampling_rate:
        audio_array = librosa.resample(audio_array, orig_sr=original_sampling_rate, target_sr=target_sampling_rate)

    # preprocessing pipeline
    audio_array = denoise_audio(audio_array, target_sampling_rate)
    audio_array = pad_or_trim(audio_array, target_sampling_rate, max_len)
    mel_spec_db = to_melspectrogram(audio_array, target_sampling_rate)

    return mel_spec_db

def inference_from_melspec(mel_spec_db, model, class_names):
    """Run inference on preprocessed mel-spectrogram"""
    # resize to match model input shape
    if model.input_shape[1:3] != mel_spec_db.shape[1:3]:
        mel_spec_resized = tf.image.resize(mel_spec_db, model.input_shape[1:3]).numpy()
    else:
        mel_spec_resized = mel_spec_db

    # add batch dimension
    mel_spec_resized = np.expand_dims(mel_spec_resized, axis=0)

    # predict
    pred = model.predict(mel_spec_resized)
    pred_label = np.argmax(pred)
    confidence = np.max(pred)

    return class_names[pred_label], confidence

async def load_model():
    """Load the TensorFlow model"""
    global model
    try:
        if os.path.exists(MODEL_PATH):
            model = keras.models.load_model(MODEL_PATH)
            logger.info(f"Model loaded successfully from {MODEL_PATH}")
            logger.info(f"Model input shape: {model.input_shape}")
        else:
            logger.warning(f"Model file {MODEL_PATH} not found. Please ensure the model is in the correct path.")
    except Exception as e:
        logger.error(f"Error loading model: {e}")

# lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await load_model()
    logger.info("Application started successfully")
    yield
    # Shutdown
    logger.info("Application shutting down")

app = FastAPI(
    title="Audio Classification API",
    description="API for bird song classification",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def process_audio_file(file_content: bytes, filename: str) -> np.ndarray:
    """Process uploaded audio file and return preprocessed mel-spectrogram"""

    def _process_sync():
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
            temp_file.write(file_content)
            temp_path = temp_file.name

        try:
            audio_array, original_sampling_rate = librosa.load(temp_path, sr=None)

            mel_spec_db = preprocess_audio_data(
                audio_array,
                original_sampling_rate,
                target_sampling_rate=16_000,
                max_len=5
            )

            return mel_spec_db

        finally:
            if os.path.exists(temp_path):
                os.unlink(temp_path)

    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, _process_sync)

# Routes
@app.post("/predict", response_model=PredictionResponse)
async def predict_audio(file: UploadFile = File(...)):
    start_time = datetime.now()

    if not file.filename.lower().endswith(('.mp3', '.wav', '.m4a')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only audio files (.mp3, .wav, .m4a) are allowed"
        )

    if model is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Model not loaded. Please check server configuration."
        )

    try:
        file_content = await file.read()

        if len(file_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File too large. Maximum size is 50MB."
            )

        mel_spec_db = await process_audio_file(file_content, file.filename)

        logger.info(f"Processed mel-spectrogram shape: {mel_spec_db.shape}")

        # run inference
        def _predict_sync():
            return inference_from_melspec(mel_spec_db, model, class_names)

        loop = asyncio.get_event_loop()
        predicted_ebird_code, confidence = await loop.run_in_executor(executor, _predict_sync)

        processing_time = (datetime.now() - start_time).total_seconds()

        return PredictionResponse(
            ebird_code=predicted_ebird_code,
            confidence=float(confidence),
            processing_time=processing_time
        )

    except Exception as e:
        logger.error(f"Error processing audio file: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing audio file: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_input_shape": model.input_shape if model else None,
        "class_names": class_names,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/")
async def root():
    return {"message": "Audio Classification API", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
