import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlanetEntity } from '../entities/planets.entity';


@Schema()
export class PlanetDocument extends Document implements PlanetEntity {
  @Prop({ required: true, unique: true })
  planetId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rotation_period: string;

  @Prop({ required: true })
  orbital_period: string;

  @Prop({ required: true })
  diameter: string;

  @Prop({ required: true })
  climate: string;

  @Prop({ required: true })
  gravity: string;

  @Prop({ required: true })
  terrain: string;

  @Prop({ required: true })
  surface_water: string;

  @Prop({ required: true })
  population: string;

  @Prop({ type: [String], required: true })
  residents: string[];

  @Prop({ type: [String], required: true })
  films: string[];

  @Prop({ required: true })
  created: string;

  @Prop({ required: true })
  edited: string;
}

export const PlanetSchema = SchemaFactory.createForClass(PlanetDocument);