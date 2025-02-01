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

export const RelationSchema = SchemaFactory.createForClass(RelationDocument);