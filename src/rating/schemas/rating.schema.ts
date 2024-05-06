import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' })
  orderId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  rating: number; 
}

export const RatingSchema = SchemaFactory.createForClass(Rating);