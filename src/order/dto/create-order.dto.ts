import { IsNotEmpty, IsNumber, IsEnum, ValidateNested, IsMongoId, ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
    @IsMongoId()
    @IsNotEmpty()
    product: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class OrderDTO {
    @IsMongoId()
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    location: string;

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
    status: string;

    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    @ArrayNotEmpty()
    @IsArray()
    products: OrderItemDTO[];
}
