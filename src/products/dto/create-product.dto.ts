import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  // ValidateNested,
} from "class-validator";
// import { Type } from "class-transformer";
import { User } from "../../auth/schema/user.schema";

// class CategoryDTO {
//   @IsNotEmpty()
//   @IsString()
//   readonly name: string;
// }
export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly stock: number;

  // @ValidateNested({ each: true })
  // @Type(() => CategoryDTO)
  // readonly categories: CategoryDTO[];
  @IsString()
  readonly category: string;

  @IsEmpty({ message: "You cannot pass a user id" })
  readonly user: User;
}
