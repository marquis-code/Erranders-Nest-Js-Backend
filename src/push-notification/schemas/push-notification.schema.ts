import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type PushNotificationDocument = PushNotification & Document;

@Schema()
export class PushNotification {

  @Prop()
  recipient: string; 

  @Prop()
  title: string; 

  @Prop()
  body: string; 
}

export const PushNotificationSchema = SchemaFactory.createForClass(PushNotification);