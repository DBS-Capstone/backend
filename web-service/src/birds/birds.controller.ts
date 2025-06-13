import {
    Controller,
    Get,
    Post,
    Param,
    NotFoundException,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BirdsService } from './birds.service';
import { Bird } from '@prisma/client';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import * as FormData from 'form-data';
import axios, { AxiosError } from 'axios';

// Define interface for the Python backend response
interface PythonResponse {
    ebird_code: string;
    confidence: number;
    processing_time: number;
}

interface UploadAudioResponse {
    inference_output: PythonResponse;
    bird: Bird;
}

@ApiTags('birds')
@Controller('birds')
export class BirdsController {
    constructor(private readonly birdsService: BirdsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all birds with their photos' })
    @ApiResponse({ status: 200, description: 'List of all birds' })
    async findAll(): Promise<Bird[]> {
        return this.birdsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a bird by ID with its photos' })
    @ApiResponse({ status: 200, description: 'Bird found' })
    @ApiResponse({ status: 404, description: 'Bird not found' })
    async findOne(@Param('id') id: string): Promise<Bird> {
        const birdId = parseInt(id, 10);
        if (isNaN(birdId)) {
            throw new BadRequestException(`Invalid ID format: ${id}`);
        }
        const bird = await this.birdsService.findOne(birdId);
        if (!bird) {
            throw new NotFoundException(`Bird with ID ${id} not found`);
        }
        return bird;
    }

    @Get('name/:common_name')
    @ApiOperation({ summary: 'Get a bird by its common name' })
    @ApiResponse({ status: 200, description: 'Bird found' })
    @ApiResponse({ status: 404, description: 'Bird not found' })
    async findByCommonName(@Param('common_name') name: string): Promise<Bird> {
        const bird = await this.birdsService.findByCommonName(name);
        if (!bird) {
            throw new NotFoundException(`Bird with name "${name}" not found`);
        }
        return bird;
    }

    @Get('habitat/:habitat')
    @ApiOperation({ summary: 'Get birds by habitat' })
    @ApiResponse({
        status: 200,
        description: 'List of birds found in the habitat',
    })
    async findByHabitat(@Param('habitat') habitat: string): Promise<Bird[]> {
        return this.birdsService.findByHabitat(habitat);
    }

    @Post('upload-audio')
    @UseInterceptors(
        FileInterceptor('audio', {
            fileFilter: (req, file, cb) => {
                if (file.mimetype.match(/\/(wav|mp3|m4a|mpeg|x-m4a)$/)) {
                    cb(null, true);
                } else {
                    cb(
                        new BadRequestException(
                            'Only audio files (.wav, .mp3, .m4a) are allowed!',
                        ),
                        false,
                    );
                }
            },
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB limit
            },
        }),
    )
    @ApiOperation({ summary: 'Upload audio file for identification' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Audio file upload',
        schema: {
            type: 'object',
            properties: {
                audio: {
                    type: 'string',
                    format: 'binary',
                    description: 'Audio file (.wav, .mp3, .m4a)',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Audio file processed successfully',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid file type or missing file',
    })
    @ApiResponse({ status: 500, description: 'Error processing audio file' })
    async uploadAudio(
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<UploadAudioResponse> {
        if (!file) {
            throw new BadRequestException('Audio file is required');
        }

        console.log('Audio file received:', {
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        });

        try {
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });

            const PYTHON_URL =
                process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
            console.log(
                'Attempting to connect to Python backend at:',
                PYTHON_URL,
            );

            const response = await axios.post<PythonResponse>(
                `${PYTHON_URL}/predict`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                    },
                    timeout: 30000, // 30 second timeout
                },
            );

            const pythonResponse = response.data;
            const bird = await this.birdsService.findBySpeciesCode(
                pythonResponse.ebird_code,
            );

            if (!bird) {
                throw new NotFoundException(
                    `Bird with ebird_code ${pythonResponse.ebird_code} not found`,
                );
            }

            return {
                bird,
                inference_output: pythonResponse,
            };
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
                throw new BadRequestException(
                    `Failed to process audio file: ${error.message}`,
                );
            } else if (error instanceof Error) {
                console.error('General error:', error.message);
                throw new BadRequestException(
                    `Failed to process audio file: ${error.message}`,
                );
            } else {
                console.error('Unknown error:', error);
                throw new BadRequestException('Failed to process audio file');
            }
        }
    }
}
