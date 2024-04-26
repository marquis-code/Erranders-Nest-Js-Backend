import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from 'mongoose';
import { User } from "./schema/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignupDTO } from "./dto/signup.dto";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup(signupDTO: SignupDTO): Promise<{ token: string }> {
    const { firstname, lastname, email, password, role } = signupDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      firstname,
      lastname,
      email,
      role,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    const { email, password } = loginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid Email or Password");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid Email or Password");
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token, ...user };
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query).select('+password');
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find({ usersFilterQuery });
  }

  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    return this.userModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.userModel.findOneAndRemove(query);
  }
}
