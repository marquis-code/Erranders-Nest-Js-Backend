import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "../dto/user.role.enum";

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: [true, "Email already exist"] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: {
    addr1: string,
    addr2: string,
    city: string,
    state: string,
    country: string,
    zip: string
  }

  @Prop({ enum: Object.values(UserRole), default: UserRole.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
