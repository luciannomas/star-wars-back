import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/planets.dto';
import { Planet } from './interfaces/planets.interface';


@Controller('ask/planets')
export class PlanetsController {
  private readonly logger = new Logger(PlanetsController.name);

  constructor(private readonly planetsService: PlanetsService) {}

  @Get(':id')
  async getPlanet(@Param('id') id: string): Promise<Planet> {
    try {
      const planet = await this.planetsService.getPlanetById(Number(id));
      this.logger.log(`Returning planet with ID ${id}`);
      return planet;
    } catch (error) {
      this.logger.error(`Failed to retrieve planet with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Post()
  async createPlanet(@Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    try {
      const planet = await this.planetsService.createPlanet(createPlanetDto);
      this.logger.log(`Created planet with ID ${createPlanetDto.planetId}`);
      return planet;
    } catch (error) {
      this.logger.error(`Failed to create planet: ${error.message}`);
      throw error;
    }
  }
}