-- CreateTable
CREATE TABLE "Bird" (
    "id" SERIAL NOT NULL,
    "species_code" VARCHAR(20) NOT NULL,
    "ebird_url" VARCHAR(500),
    "common_name" VARCHAR(255),
    "scientific_name" VARCHAR(255),
    "family" VARCHAR(255),
    "order_name" VARCHAR(255),
    "conservation_status" VARCHAR(100),
    "habitat" TEXT,
    "description" TEXT,
    "behavior" TEXT,
    "diet" TEXT,
    "nesting" TEXT,
    "migration_pattern" TEXT,
    "vocalization" TEXT,
    "size_length_cm" DECIMAL(6,2),
    "size_wingspan_cm" DECIMAL(6,2),
    "size_weight_g" DECIMAL(8,2),
    "finding_tips" TEXT,
    "cool_facts" JSONB,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FotoVoice" (
    "id" SERIAL NOT NULL,
    "foto_url" VARCHAR(500) NOT NULL,
    "bird_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FotoVoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bird_species_code_key" ON "Bird"("species_code");

-- CreateIndex
CREATE INDEX "Bird_common_name_idx" ON "Bird"("common_name");

-- CreateIndex
CREATE INDEX "Bird_scientific_name_idx" ON "Bird"("scientific_name");

-- CreateIndex
CREATE INDEX "Bird_family_idx" ON "Bird"("family");

-- CreateIndex
CREATE INDEX "Bird_order_name_idx" ON "Bird"("order_name");

-- CreateIndex
CREATE INDEX "Bird_species_code_idx" ON "Bird"("species_code");

-- AddForeignKey
ALTER TABLE "FotoVoice" ADD CONSTRAINT "FotoVoice_bird_id_fkey" FOREIGN KEY ("bird_id") REFERENCES "Bird"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
