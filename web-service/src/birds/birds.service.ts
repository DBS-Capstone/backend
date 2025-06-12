import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Bird } from '@prisma/client';

@Injectable()
export class BirdsService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Bird[]> {
        return this.prisma.bird.findMany({
            include: {
                foto_voice: true,
            },
        });
    }

    async findOne(id: number): Promise<Bird | null> {
        return this.prisma.bird.findUnique({
            where: { id },
            include: {
                foto_voice: true,
            },
        });
    }

    async findByCommonName(name: string): Promise<Bird | null> {
        return this.prisma.bird.findFirst({
            where: {
                common_name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            include: {
                foto_voice: true,
            },
        });
    }

    async findBySpeciesCode(species_code: string): Promise<Bird | null> {
        return this.prisma.bird.findUnique({
            where: {
                species_code: species_code,
            },
            include: {
                foto_voice: true,
            },
        });
    }

    async findByHabitat(habitat: string): Promise<Bird[]> {
        return this.prisma.bird.findMany({
            where: {
                habitat: {
                    contains: habitat,
                    mode: 'insensitive',
                },
            },
            include: {
                foto_voice: true,
            },
        });
    }
}
