import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { FilmDto } from './dto/filmDto.dto';
import { Film } from './interfaces/films.interface';

@Injectable()
export class FilmsService {
  private readonly apiEndpoint = 'https://swapi.dev/api/films';
  private readonly logger = new Logger(FilmsService.name);

  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}

  private formatFilmData(data: any, id: number): Film {
    return {
      filmId: id,
      title: data.title,
      director: data.director,
      producer: data.producer,
      release_date: data.release_date,
      characters: data.characters,
      planets: data.planets,
      starships: data.starships,
      vehicles: data.vehicles,
      species: data.species,
      created: data.created,
      edited: data.edited,
    };
  }

  async getFilmById(id: number): Promise<Film> {
    try {
      let film = await this.filmModel.findOne({ filmId: id }).exec();
      
      if (!film) {
        this.logger.log(`Film with ID ${id} not found in database. Fetching from external API...`);
        
        const response = await axios.get(`${this.apiEndpoint}/${id}`);
        const data = response.data;

        if (!data) {
          throw new NotFoundException(`Film with ID ${id} not found`);
        }

        const formattedData = this.formatFilmData(data, id);
        film = new this.filmModel(formattedData);
        await film.save();
        
        this.logger.log(`Film with ID ${id} saved to database`);
        return formattedData;
      } else {
        this.logger.log(`Film with ID ${id} found in database`);
      }

      return film;
    } catch (error) {
      this.logger.error(`Error fetching film with ID ${id}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Film with ID ${id} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }

  async createFilm(filmDto: FilmDto): Promise<Film> {
    try {
      const createdFilm = new this.filmModel(filmDto);
      await createdFilm.save();
      this.logger.log(`Created film with ID ${filmDto.filmId}`);
      return createdFilm;
    } catch (error) {
      this.logger.error(`Failed to create film: ${error.message}`);
      throw error;
    }
  }
}