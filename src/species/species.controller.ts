import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { Species } from './interfaces/species.interface';
import { CreateSpeciesDto } from './dto/create.species.dto';

@Controller('ask/species')
export class SpeciesController {
  private readonly logger = new Logger(SpeciesController.name);

  constructor(private readonly speciesService: SpeciesService) {}

  @Get(':id')
  async getSpecies(@Param('id') id: string): Promise<Species> {
    try {
      const species = await this.speciesService.getSpeciesById(Number(id));
      this.logger.log(`Returning species with ID ${id}`);
      return species;
    } catch (error) {
      this.logger.error(`Failed to retrieve species with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Post()
  async createSpecies(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    try {
      const species = await this.speciesService.createSpecies(createSpeciesDto);
      this.logger.log(`Created species with ID ${createSpeciesDto.speciesId}`);
      return species;
    } catch (error) {
      this.logger.error(`Failed to create species: ${error.message}`);
      throw error;
    }
  }
}