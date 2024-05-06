// errand.schema.ts
import * as mongoose from 'mongoose';

export const ErrandSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  // other errand details
});
