// email.interface.ts
import { Document } from 'mongoose';

export interface Email extends Document {
  recipient: string;
  subject: string;
  body: string;
  // other email properties
}
