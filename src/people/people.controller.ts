import { Controller, Get, Param, Logger } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './interface/people.interface';
@Controller("ask/people")
export class PeopleController {
  private readonly logger = new Logger(PeopleController.name);

  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  async getPerson(@Param('id') id: string): Promise<any> {
    try {
      const person = await this.peopleService.getPersonById(Number(id));
      this.logger.log(`Returning person with ID ${id}`);
      return person;
    } catch (error) {
      this.logger.error(`Failed to retrieve person with ID ${id}: ${error.message}`);
      throw error;
    }
  }
}