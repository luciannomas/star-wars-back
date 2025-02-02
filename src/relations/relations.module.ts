import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { PlanetResidentsSchema, RelationSchema } from './schema/relations.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Relation', schema: RelationSchema },
      { name: 'PlanetResidents', schema: PlanetResidentsSchema },
    ]),
    PeopleModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
  ],
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}