import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ collection: 'cats' })
export class Cat {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
