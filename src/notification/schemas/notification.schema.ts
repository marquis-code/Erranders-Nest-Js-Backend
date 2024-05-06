import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type NotificationDocument = Notification & Document;
@Schema({
  timestamps: true,
})

export class Notification {
  @Prop()
  message: string;

  @Prop()
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  recipient: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
