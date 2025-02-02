import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';

import { CreateRelationDto } from './dto/relations.dto';
import { PlanetResidentsDocument, RelationDocument } from './schema/relations.schema';
import { PersonFilms, PlanetResidents, Relation } from '../relations/interfaces/relations.interface';
import { PlanetsService } from 'src/planets/planets.service';
import { SpeciesService } from 'src/species/species.service';


@Injectable()
export class RelationsService {
  private readonly logger = new Logger(RelationsService.name);

  constructor(
    @InjectModel('Relation') private readonly relationModel: Model<RelationDocument>,
    @InjectModel('PlanetResidents') private readonly planetResidentsModel: Model<PlanetResidentsDocument>,
    private readonly peopleService: PeopleService,
    private readonly filmsService: FilmsService,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
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

  async getPlanetResidents(planetId: number): Promise<PlanetResidents> {
    try {
      // Obtener datos del planeta desde la API externa
      const planet = await this.planetsService.getPlanetById(planetId);
      const residentUrls = planet.residents;

      // Obtener detalles de los residentes
      const residents = await Promise.all(
        residentUrls.map(async (url) => {
          const residentId = parseInt(url.split('/').slice(-2, -1)[0], 10);
          const resident = await this.peopleService.getPersonById(residentId);
          
          // Obtener la especie del residente
          const speciesUrls = resident.species; // Asumiendo que la especie está en un array
          const speciesId = speciesUrls.length > 0 ? parseInt(speciesUrls[0].split('/').slice(-2, -1)[0], 10) : null;
          const species = speciesId ? await this.speciesService.getSpeciesById(speciesId) : { name: 'Unknown' };

          const filmTitles = await Promise.all(
            resident.films.map(async (filmUrl) => {
              const filmId = parseInt(filmUrl.split('/').slice(-2, -1)[0], 10);
              const film = await this.filmsService.getFilmById(filmId);
              return film.title;
            })
          );

          return {
            name: resident.name,
            species: species.name,
            films: filmTitles,
          };
        })
      );

      // Obtener títulos de las películas del planeta
      const planetFilmTitles = await Promise.all(
        planet.films.map(async (filmUrl) => {
          const filmId = parseInt(filmUrl.split('/').slice(-2, -1)[0], 10);
          const film = await this.filmsService.getFilmById(filmId);
          return film.title;
        })
      );

      return {
        planetId,
        planetName: planet.name,
        residents,
        films: planetFilmTitles,
      };
    } catch (error) {
      this.logger.error(`Error fetching residents for planet with ID ${planetId}: ${error.message}`);
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Planet with ID ${planetId} not found`);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }
}