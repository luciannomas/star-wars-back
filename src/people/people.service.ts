import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonResponse } from './interface/people.interface';
import axios from 'axios';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);
  private readonly apiEndpoint = 'https://swapi.dev/api/people';

  constructor(@InjectModel('Person') private readonly personModel: Model<PersonResponse>) {}

  private formatPersonData(data: any, id: number): PersonResponse {
    const validGenders = ['male', 'female', 'other'];
    const gender = validGenders.includes(data.gender) ? data.gender : 'other';
  
    return {
      personId: id,
      name: data.name,
      birthYear: data.birth_year,
      gender: gender,
      height: parseInt(data.height, 10),
      films: data.films,
    };
  }

  async getPersonById(id: number): Promise<PersonResponse> {
    try {
      // Consultar la base de datos primero
      let person = await this.personModel.findOne({ personId: id }).exec();
      
      if (!person) {
        this.logger.log(`Person with ID ${id} not found in database. Fetching from external API...`);
        
        // Si no está en la base de datos, consultar la API externa
        const response = await axios.get(`${this.apiEndpoint}/${id}`);
        const data = response.data;

        if (!data) {
          throw new NotFoundException(`Person with ID ${id} not found`);
        }

        // Formatear la información recibida
        const formattedData = this.formatPersonData(data, id);
     
        // Guardar la información en la base de datos
        person = new this.personModel(formattedData);
        await person.save();
        
        this.logger.log(`Person with ID ${id} saved to database`);
        return formattedData;
      } else {
        this.logger.log(`Person with ID ${id} found in database`);
      }

      return person;
    } catch (error) {
      this.logger.error(`Error fetching person with ID ${id}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Person with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }
}