import {observable, action, computed} from 'mobx';

import {getOrderInfo} from '@/services/order';
import {orderStore} from '@/store/stores/order';
import { cartStore } from '@/store/stores/cart';
import { productStore } from '@/store/stores/products';


class OrderPageStore {
    @observable
    orderLoadingSuccess = false;
    @observable
    orderLoadingError: null | string = null;

    @action
    getOrder = async (orderId: number, key: string) => {
        this.orderLoadingError = null;

        const orderRes = await getOrderInfo(orderId, key);

        if (orderRes.ok === false) {
            this.orderLoadingError = orderRes.error;
        } else {
            const {order} = orderRes.data;

            orderStore.addOrder(order);
            this.orderLoadingSuccess = true;
        }
    }
}


export const orderPageStore = new OrderPageStore();
