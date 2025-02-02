import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RelationEntity } from '../entities/relations.entity';


@Schema()
export class RelationDocument extends Document implements RelationEntity {
  @Prop({ required: true, unique: true })
  personId: number;

  @Prop({ required: true })
  personName: string;

  @Prop({ type: [String], required: true })
  films: string[];
}

@Schema()
export class PlanetResidentsDocument extends Document {
  @Prop({ required: true, unique: true })
  planetId: number;

  @Prop({ required: true })
  planetName: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        species: { type: String, required: true },
        films: { type: [String], required: true },
      },
    ],
    required: true,
  })
  residents: {
    name: string;
    species: string;
    films: string[];
  }[];
}


export const RelationSchema = SchemaFactory.createForClass(RelationDocument);
export const PlanetResidentsSchema = SchemaFactory.createForClass(PlanetResidentsDocument)