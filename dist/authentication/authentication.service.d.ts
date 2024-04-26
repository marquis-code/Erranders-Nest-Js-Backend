import { FilterQuery, Model } from 'mongoose';
import { User } from "./schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { SignupDTO } from "./dto/signup.dto";
import { LoginDTO } from "./dto/login.dto";
export declare class AuthenticationService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signup(signupDTO: SignupDTO): Promise<{
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        token: string;
    }>;
    findOne(query: any): Promise<any>;
    find(usersFilterQuery: FilterQuery<User>): Promise<User[]>;
    findOneAndUpdate(query: any, payload: any): Promise<User>;
    findOneAndRemove(query: any): Promise<any>;
}
