import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FilmEntity } from '../entities/film.entity';

@Schema()
export class FilmDocument extends Document implements FilmEntity {
  @Prop({ required: true, unique: true })
  filmId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ type: [String], required: true })
  characters: string[];

  @Prop({ type: [String], required: true })
  planets: string[];

  @Prop({ type: [String], required: true })
  starships: string[];

  @Prop({ type: [String], required: true })
  vehicles: string[];

  @Prop({ type: [String], required: true })
  species: string[];

  @Prop({ required: true })
  created: string;

  @Prop({ required: true })
  edited: string;

  /* @Prop({ required: true })
  url: string */;
}

export const FilmSchema = SchemaFactory.createForClass(FilmDocument);