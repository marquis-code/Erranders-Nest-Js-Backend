import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  IsEmpty,
  // ValidateNested,
} from "class-validator";
// import { Type } from "class-transformer";
import { User } from "../../auth/schema/user.schema";

// class CategoryDTO {
//   @IsNotEmpty()
//   @IsString()
//   name: string;
// }
export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  // @ValidateNested({ each: true })
  // @Type(() => CategoryDTO)
  category: string;
  // categories: CategoryDTO[];

  @IsEmpty({ message: "You cannot pass a user id" })
  readonly user: User;
}
