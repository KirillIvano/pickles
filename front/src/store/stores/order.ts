import {computed, observable} from 'mobx';

import {OrderType} from '@/entities/order/types';


export class OrderStore {
    @observable
    private _orders = new Map<number, OrderType>();

    @computed
    get orders() {
        return this._orders;
    }

    addOrder(order: OrderType) {
        this._orders.set(order.id, order);
    }
}


export const orderStore = new OrderStore();
