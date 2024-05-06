// notification.interface.ts
import { Document } from "mongoose";

export interface Notification extends Document {
  recipient: string;
  message: string;
  type: string;
  // other notification properties
}
