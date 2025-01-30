import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleController } from '../people/people.controller';
import { PeopleService } from './people.service';
import { PersonSchema } from './schema/people.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}