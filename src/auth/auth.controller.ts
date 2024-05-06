// import {
//   Controller,
//   Post,
//   Body,
//   UseGuards,
//   Get,
//   Request,
//   Query,
//   Put,
//   Delete,
// } from "@nestjs/common";
// import { AuthenticationService } from "./auth.service";
// import { SignupDTO } from "./dto/signup.dto";
// import { LoginDTO } from "./dto/login.dto";
// import { AuthGuard } from "@nestjs/passport";

// @Controller("auth")
// export class AuthenticationController {
//   constructor(private readonly authenticationService: AuthenticationService) {}

//   @Post("/signup")
//   async signup(@Body() signupDTO: SignupDTO): Promise<{ token: string }> {
//     return await this.authenticationService.signup(signupDTO);
//   }

//   @Post("/login")
//   async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
//     return await this.authenticationService.login(loginDTO);
//   }

//   @UseGuards(AuthGuard())
//   @Get("/viewProfile")
//   async getUser(@Request() req): Promise<any> {
//     return req.user;
//   }

//   @UseGuards(AuthGuard())
//   @Get("/all-users")
//   async getAllUsers(@Query() query: string) {
//     return await this.authenticationService.find({ query });
//   }

//   @UseGuards(AuthGuard())
//   @Put()
//   async updateUser(@Body() user: any, @Query() query: string) {
//     return await this.authenticationService.findOneAndUpdate(query, user);
//   }

//   @UseGuards(AuthGuard())
//   @Delete()
//   async deleteUser(@Query() query: string) {
//     return await this.authenticationService.findOneAndRemove(query);
//   }
// }

import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}