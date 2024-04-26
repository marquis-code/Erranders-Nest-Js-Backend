import { User } from "../../../authentication/schema/user.schema";
declare class CategoryDTO {
    name: string;
}
export declare class UpdateProductDTO {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock: number;
    categories: CategoryDTO[];
    readonly user: User;
}
export {};
