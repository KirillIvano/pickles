import {observable, action} from 'mobx';

import {createOrder} from '@/services/order';
import {cartStore} from '@/store/stores/cart';
import { userStore } from '@/store/stores/user';
import { UserRetailType } from '@/entities/user/types';


export class CheckoutFormStore {
    @observable
    formSendingError: null | string = null;
    @observable
    formSendingInProgress = false;
    @observable
    formSendingSuccess = false;

    @observable
    orderInfo: {id?: number; key?: string} = {};

    @action
    finishOrderCreating() {
        this.formSendingError = null;
        this.formSendingInProgress= false;
        this.formSendingSuccess = false;
        this.orderInfo = {};

        cartStore.getCart(userStore.retailType).clearCart();
    }

    @action
    async sendCheckoutForm(body: {
        name: string;
        phone: string;
        email: string;
        address: string;
        comment: string;
    }) {
        this.formSendingError = null;
        this.formSendingInProgress = true;

        const items = cartStore.getCart(userStore.retailType).cartItems.map(
            ({productId, productsCount}) =>
                ({productId, quantity: productsCount}),
        );
        const orderRes = await createOrder({
            ...body,
            retail: userStore.retailType === UserRetailType.RETAIL,
            items,
        });

        if (orderRes.ok === false) {
            this.formSendingError = orderRes.error;
        } else {
            this.formSendingSuccess = true;

            this.orderInfo = orderRes.data;
        }

        this.formSendingInProgress = false;
    }
}

export const checkoutFormStore = new CheckoutFormStore();
