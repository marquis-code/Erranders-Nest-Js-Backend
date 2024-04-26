import { User } from "../../../authentication/schema/user.schema";
declare class CategoryDTO {
    readonly name: string;
}
export declare class CreateProductDTO {
    readonly name: string;
    readonly description?: string;
    readonly price: number;
    readonly imageUrl?: string;
    readonly stock: number;
    readonly categories: CategoryDTO[];
    readonly user: User;
}
export {};
