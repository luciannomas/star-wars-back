import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { SpeciesDocument, SpeciesSchema } from './schema/species.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Specie', schema: SpeciesSchema }])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}