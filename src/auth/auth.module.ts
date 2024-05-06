// import { Module } from "@nestjs/common";
// import { AuthenticationController } from "./auth.controller";
// import { AuthService } from "./auth.service";
// import { MongooseModule } from "@nestjs/mongoose";
// import { UserSchema } from "./schema/user.schema";
// import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from "@nestjs/jwt";
// import { ConfigService } from "@nestjs/config";
// import { JwtStrategy } from "./jwt.strategy";

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: "jwt" }),
//     JwtModule.registerAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         return {
//           secret: config.get<string>("JWT_SECRET"),
//           signOptions: {
//             expiresIn: config.get<string | number>("JWT_EXPIRE"),
//           },
//         };
//       },
//     }),
//     MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
//   ],
//   controllers: [AuthenticationController],
//   providers: [AuthService, JwtStrategy],
//   exports: [JwtStrategy, PassportModule],
// })
// export class AuthenticationModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'

@Module({
  imports: [
    UserModule, 
    PassportModule,     
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
