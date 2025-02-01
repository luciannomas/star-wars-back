import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';

import { CreateRelationDto } from './dto/relations.dto';
import { RelationDocument } from './schema/relations.schema';
import { PersonFilms } from '../relations/interfaces/relations.interface';


@Injectable()
export class RelationsService {
  private readonly logger = new Logger(RelationsService.name);

  constructor(
    @InjectModel('Relation') private readonly relationModel: Model<RelationDocument>,
    private readonly peopleService: PeopleService,
    private readonly filmsService: FilmsService,
  ) {}

  private async saveRelation(createRelationDto: CreateRelationDto): Promise<RelationDocument> {
    const createdRelation = new this.relationModel(createRelationDto);
    return createdRelation.save();
  }

  async getPersonFilms(personId: number): Promise<any> {
    try {
      // Consultar la base de datos primero
      let relation: RelationDocument | null  = await this.relationModel.findOne({ personId }).exec();

      if (!relation) {
        // Obtener datos del personaje
        const person = await this.peopleService.getPersonById(personId);
        const filmUrls = person.films;

        // Obtener títulos de las películas
        const filmTitles = await Promise.all(
          filmUrls.map(async (url) => {
            const filmId = parseInt(url.split('/').slice(-2, -1)[0], 10);
            const film = await this.filmsService.getFilmById(filmId);
            return film.title;
          })
        );

        this.logger.log(`Person with ID ${personId} has appeared in ${filmTitles.length} films`);

        // Guardar la relación en la base de datos
        const createRelationDto: CreateRelationDto = {
          personId,
          personName: person.name,
          films: filmTitles,
        };
        relation = await this.saveRelation(createRelationDto);
      } else {
        this.logger.log(`Relation for person ID ${personId} found in database`);
      }

      return {
        personName: relation.personName,
        films: relation.films,
      };
    } catch (error) {
      this.logger.error(`Error fetching films for person with ID ${personId}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Person with ID ${personId} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }
}