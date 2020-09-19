import {request} from '@/util/request';
import {getRequestUrl} from '@/util/getRequestUrl';

import {OrderCreateDto, OrderDto} from './dto';


export const createOrder = (body: OrderCreateDto) =>
    request<{id: number; key: string}>(
        getRequestUrl('/api/order'),
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

export const getOrderInfo = (orderId: number, key: string) =>
    request<{order: OrderDto}>(
        getRequestUrl(`/api/order/${orderId}`, {key}),
    );
