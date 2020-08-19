import {observable, action} from 'mobx';

import {cartStore} from '@/store/stores/cart';
import {productStore} from '@/store/stores/products';
import {getPreviewsByIds} from '@/services/product';
import {clientifyProductPreview} from '@/entities/product/transformers';


class CartPageStorage {
    @observable
    cartGettingError: string | null;
    @observable
    cartGettingCompleted = false;

    @action
    getCartItems = async () => {
        const {cartItems} = cartStore;

        if (!cartItems.length) return;

        this.cartGettingCompleted = false;
        this.cartGettingError = null;

        const productIds = cartItems.map(({productId}) => productId);

        const productGetRes = await getPreviewsByIds(productIds);

        if (productGetRes.ok === false) {
            this.cartGettingError = productGetRes.error;
        } else {
            const {products} = productGetRes.data;
            productStore.addProductPreviews(
                products.map(clientifyProductPreview),
            );
        }

        this.cartGettingCompleted = true;
    }
}


export const cartPageStorage = new CartPageStorage();
