import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
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
    const { firstname, lastname, email, password, role, address, phone } = signupDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      firstname,
      lastname,
      email,
      role,
      phone,
      address,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(
    loginDTO: LoginDTO
  ): Promise<{ token: string; user: any }> {
    const { email, password: userPassword } = loginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid Email or Password");
    }
    const isPasswordMatch = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid Email or Password");
    }

    const token = this.jwtService.sign({ id: user._id });
    console.log(user, "user here");
    return {
      token,
      user: {
        role: user.role,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        address: {
          addr1: user.address.addr1,
          addr2: user.address.addr2,
          city: user.address.city,
          state: user.address.state,
          country: user.address.country,
          zip: user.address.zip,
        }
      },
    };
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query).select("+password");
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
