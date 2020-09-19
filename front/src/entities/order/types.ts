export type OrderItem = {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}

export type OrderType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    comment: string;
    items: OrderItem[];
}
