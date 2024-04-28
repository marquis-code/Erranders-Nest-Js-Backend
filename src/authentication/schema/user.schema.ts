import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../dto/user.role.enum';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ unique: true, required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: {
      addr1: { type: String, required: true },
      addr2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String }
    }
  })
  address: {
    addr1: string,
    addr2?: string, // Optional
    city?: string,
    state?: string,
    country?: string,
    zip?: string
  };

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
