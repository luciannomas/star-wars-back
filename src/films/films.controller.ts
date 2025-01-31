import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from '../films/interfaces/films.interface';
import { FilmDto } from './dto/filmDto.dto';

@Controller('ask/films')
export class FilmsController {
  private readonly logger = new Logger(FilmsController.name);

  constructor(private readonly filmsService: FilmsService) {}

  @Get(':id')
  async getFilm(@Param('id') id: string): Promise<Film> {
    try {
      const film = await this.filmsService.getFilmById(Number(id));
      this.logger.log(`Returning film with ID ${id}`);
      return film;
    } catch (error) {
      this.logger.error(`Failed to retrieve film with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  @Post()
  async createFilm(@Body() filmDto: FilmDto): Promise<Film> {
    try {
      const film = await this.filmsService.createFilm(filmDto);
      this.logger.log(`Created film with ID ${filmDto.filmId}`);
      return film;
    } catch (error) {
      this.logger.error(`Failed to create film: ${error.message}`);
      throw error;
    }
  }
}