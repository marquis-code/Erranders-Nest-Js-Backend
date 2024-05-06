import { Document } from 'mongoose';
import { UserRole } from '../dto/user.role.enum';
export declare class User extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    address: {
        addr1: string;
        addr2?: string;
        city?: string;
        state?: string;
        country?: string;
        zip?: string;
    };
    role: UserRole;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any>, undefined, {}>;
