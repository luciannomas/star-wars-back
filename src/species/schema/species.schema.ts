import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SpeciesEntity } from '../entities/species.entity';

@Schema()
export class SpeciesDocument extends Document implements SpeciesEntity {
  @Prop({ required: true, unique: true })
  speciesId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  classification: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: false }) // Hacer que homeworld sea opcional
  homeworld: string;

  @Prop({ required: true })
  language: string;

  @Prop({ type: [String], required: true })
  people: string[];

  @Prop({ type: [String], required: true })
  films: string[];

  @Prop({ required: true })
  created: string;

  @Prop({ required: true })
  edited: string;
}

export const SpeciesSchema = SchemaFactory.createForClass(SpeciesDocument);