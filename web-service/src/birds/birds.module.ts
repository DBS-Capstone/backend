import { Module } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { BirdsController } from './birds.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [BirdsService, PrismaService],
    controllers: [BirdsController],
})
export class BirdsModule {}
