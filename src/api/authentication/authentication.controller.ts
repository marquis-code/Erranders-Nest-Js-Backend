import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Query,
  Put,
  Delete
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignupDTO } from "./dto/signup.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("/signup")
  async signup(@Body() signupDTO: SignupDTO): Promise<{ token: string }> {
    return await this.authenticationService.signup(signupDTO);
  }

  @Post("/login")
  async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    return await this.authenticationService.login(loginDTO);
  }

  @UseGuards(AuthGuard())
  @Get("/viewProfile")
  async getUser(@Request() req): Promise<any> {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Get("/all-users")
  async getAllUsers(@Query() query: string) {
    return await this.authenticationService.find({ query });
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateUser(@Body() user: any, @Query() query: string) {
    return await this.authenticationService.findOneAndUpdate(query, user);
  }

  @UseGuards(AuthGuard())
  @Delete()
  async deleteUser(@Query() query: string) {
    return await this.authenticationService.findOneAndRemove(query);
  }
}
