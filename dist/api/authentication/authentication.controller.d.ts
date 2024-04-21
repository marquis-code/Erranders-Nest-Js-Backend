import { AuthenticationService } from "./authentication.service";
import { SignupDTO } from "./dto/signup.dto";
import { LoginDTO } from "./dto/login.dto";
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signup(signupDTO: SignupDTO): Promise<{
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        token: string;
    }>;
    getUser(req: any): Promise<any>;
    getAllUsers(query: string): Promise<import("./schema/user.schema").User[]>;
    updateUser(user: any, query: string): Promise<import("./schema/user.schema").User>;
    deleteUser(query: string): Promise<any>;
}
