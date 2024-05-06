

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EmailDocument = Email & Document;

@Schema({
  timestamps: true,
})
export class Email {
  @Prop()
  recipient: string;

  @Prop()
  subject: string;

  @Prop()
  body: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
