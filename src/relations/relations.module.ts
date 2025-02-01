import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { RelationSchema } from './schema/relations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Relation', schema: RelationSchema }]),
    PeopleModule,
    FilmsModule,
  ],
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}