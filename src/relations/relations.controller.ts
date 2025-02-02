import { Controller, Get, Param, Logger } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { PersonFilms, PlanetResidents } from './interfaces/relations.interface';

@Controller('ask/relations')
export class RelationsController {
  private readonly logger = new Logger(RelationsController.name);

  constructor(private readonly relationsService: RelationsService) {}

  @Get('person-films/:personId')
  async getPersonFilms(@Param('personId') personId: string): Promise<PersonFilms> {
    try {
      const result = await this.relationsService.getPersonFilms(Number(personId));
      this.logger.log(`Returning films for person ID ${personId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to retrieve films for person ID ${personId}: ${error.message}`);
      throw error;
    }
  }

  @Get('planet-residents/:planetId')
  async getPlanetResidents(@Param('planetId') planetId: string): Promise<PlanetResidents> {
    try {
      const result = await this.relationsService.getPlanetResidents(Number(planetId));
      this.logger.log(`Returning residents for planet ID ${planetId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to retrieve residents for planet ID ${planetId}: ${error.message}`);
      throw error;
    }
  }
}