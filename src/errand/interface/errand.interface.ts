// errand.interface.ts
import { Document } from 'mongoose';

export interface Errand extends Document {
  orderId: string;
  // other errand properties
}
