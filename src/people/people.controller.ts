import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PeopleService } from './people.service';
import { Person } from './interface/people.interface';


@Controller("ask/people")
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  async getPerson(@Param('id') id: string): Promise<any> {
    try {
      const person = await this.peopleService.getPersonById(Number(id));
      console.log(`Returning person with ID ${id}`);
      return person;
    } catch (error) {
      console.error(`Failed to retrieve person with ID ${id}:`, error.message);
      throw error;
    }
  }
}
