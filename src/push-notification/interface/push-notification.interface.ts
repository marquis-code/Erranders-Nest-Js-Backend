// push-notification.interface.ts
import { Document } from "mongoose";

export interface PushNotification extends Document {
  recipient: string;
  title: string;
  body: string;
  // other push notification properties
}
