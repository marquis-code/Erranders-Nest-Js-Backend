export declare class OrderItemDTO {
    product: string;
    quantity: number;
    price: number;
}
export declare class OrderDTO {
    user: string;
    total: number;
    status: string;
    products: OrderItemDTO[];
}
