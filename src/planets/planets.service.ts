import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { PlanetDocument } from './schema/planets.schema';
import { CreatePlanetDto } from './dto/planets.dto';
import { Planet } from './interfaces/planets.interface';
import { ExternalPlanetDto } from './dto/external.planet.dto';

@Injectable()
export class PlanetsService {
  private readonly logger = new Logger(PlanetsService.name);
  private readonly apiEndpoint = 'https://swapi.dev/api/planets';

  constructor(@InjectModel('Planet') private readonly planetModel: Model<PlanetDocument>) {}

  private formatPlanetData(data: ExternalPlanetDto, id: number): Planet {
    return {
      planetId: id,
      name: data.name,
      rotation_period: data.rotation_period,
      orbital_period: data.orbital_period,
      diameter: data.diameter,
      climate: data.climate,
      gravity: data.gravity,
      terrain: data.terrain,
      surface_water: data.surface_water,
      population: data.population,
      residents: data.residents,
      films: data.films,
      created: data.created,
      edited: data.edited,
    };
  }

  async getPlanetById(id: number): Promise<Planet> {
    try {
      let planet = await this.planetModel.findOne({ planetId: id }).exec();
      
      if (!planet) {
        this.logger.log(`Planet with ID ${id} not found in database. Fetching from external API...`);
        
        const response = await axios.get(`${this.apiEndpoint}/${id}`);
        const data = response.data;

        if (!data) {
          throw new NotFoundException(`Planet with ID ${id} not found`);
        }

        const formattedData = this.formatPlanetData(data, id);
        planet = new this.planetModel(formattedData);
        await planet.save();
        
        this.logger.log(`Planet with ID ${id} saved to database`);
        return formattedData;
      } else {
        this.logger.log(`Planet with ID ${id} found in database`);
      }

      return planet;
    } catch (error) {
      this.logger.error(`Error fetching planet with ID ${id}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Planet with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }

  async createPlanet(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    try {
      const createdPlanet = new this.planetModel(createPlanetDto);
      await createdPlanet.save();
      this.logger.log(`Created planet with ID ${createPlanetDto.planetId}`);
      return createdPlanet;
    } catch (error) {
      this.logger.error(`Failed to create planet: ${error.message}`);
      throw error;
    }
  }
}