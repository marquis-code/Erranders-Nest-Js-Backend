// rating.interface.ts
import { Document } from 'mongoose';

export interface Rating extends Document {
  orderId: string;
  userId: string;
  rating: number;
  // other rating properties
}
