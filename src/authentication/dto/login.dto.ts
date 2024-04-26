import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: "Please Enter a valid email address" })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
