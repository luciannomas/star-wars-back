import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthYear: string;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ required: true, min: 0 })
  height: number;

  @Prop({
    type: [String],
    required: true,
    validate: {
      validator: function(array: string[]) {
        return array.length > 0;
      },
      message: 'Person must have at least one film',
    },
  })
  films: string[];

  @Prop({ required: true, unique: true })
  personId: number;
}

export const PersonSchema = SchemaFactory.createForClass(Person);