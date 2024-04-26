import { Document } from "mongoose";
export declare class User extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any>, undefined, {}>;
