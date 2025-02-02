import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleController } from '../people/people.controller';
import { PeopleService } from './people.service';
import { PersonSchema } from './schema/people.schema';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
    FilmsModule
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService], 
})
export class PeopleModule {}