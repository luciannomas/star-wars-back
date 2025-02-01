import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Species } from './interfaces/species.interface';

import axios from 'axios';
import { SpeciesDocument } from './schema/species.schema';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { ExternalSpeciesDto } from './dto/species.dto';

@Injectable()
export class SpeciesService {
  private readonly logger = new Logger(SpeciesService.name);
  private readonly apiEndpoint = 'https://swapi.dev/api/species';

  constructor(@InjectModel('Specie') private readonly speciesModel: Model<SpeciesDocument>) {}

  private formatSpeciesData(data: ExternalSpeciesDto, id: number): CreateSpeciesDto {
    return {
      speciesId: id,
      name: data.name,
      classification: data.classification,
      designation: data.designation,
      homeworld: data.homeworld,
      language: data.language,
      people: data.people,
      films: data.films,
      created: data.created,
      edited: data.edited,
    };
  }

  async getSpeciesById(id: number): Promise<Species> {
    try {
      let species: SpeciesDocument | null = await this.speciesModel.findOne({ speciesId: id }).exec();
      
      if (!species) {
        this.logger.log(`Species with ID ${id} not found in database. Fetching from external API...`);
        
        const response = await axios.get(`${this.apiEndpoint}/${id}`);
        const data: ExternalSpeciesDto = response.data;

        if (!data) {
          throw new NotFoundException(`Species with ID ${id} not found`);
        }

        const formattedData = this.formatSpeciesData(data, id);
        species = await this.createSpecies(formattedData);
        
        this.logger.log(`Species with ID ${id} saved to database`);
        return species.toObject();
      } else {
        this.logger.log(`Species with ID ${id} found in database`);
        return species.toObject();
      }
    } catch (error) {
      this.logger.error(`Error fetching species with ID ${id}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Species with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }

  async createSpecies(createSpeciesDto: CreateSpeciesDto): Promise<SpeciesDocument> {
    try {
      const createdSpecies = new this.speciesModel(createSpeciesDto);
      await createdSpecies.save();
      this.logger.log(`Created species with ID ${createSpeciesDto.speciesId}`);
      return createdSpecies;
    } catch (error) {
      this.logger.error(`Failed to create species: ${error.message}`);
      throw error;
    }
  }
}