import {OrderType} from '@/entities/order/types';

export type OrderCreateDto = {
    name: string;
    phone: string;
    email: string;
    address: string;
    comment: string;

    retail: boolean;

    items: {productId: number; quantity: number}[];
}

export type OrderDto = OrderType;
