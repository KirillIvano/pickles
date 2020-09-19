import {observable, action, computed} from 'mobx';

import {cartStore} from '@/store/stores/cart';
import {productStore} from '@/store/stores/products';
import {getPreviewsByIds} from '@/services/product';
import {clientifyProductPreview} from '@/entities/product/transformers';
import {DELIVERY_PRICE, FREE_DELIVERY_RATE, MIN_DELIVERY_PRICE} from '@/constants/delivery';


class CartPageStorage {
    @observable
    cartGettingError: string | null;
    @observable
    cartGettingCompleted = false;

    @computed
    get cartTotalProductsPrice(): number {
        return cartStore.cartItems.reduce(
            (acc, {productId, productsCount}) => {
                const productPreview = productStore.getProductPreviewById(productId);

                return acc + (productPreview ? productPreview.price * productsCount : 0);
            },
            0,
        );
    }

    @computed
    get deliveryPrice(): number {
        if (this.cartTotalProductsPrice < MIN_DELIVERY_PRICE) {
            return 0;
        } else if (this.cartTotalProductsPrice < FREE_DELIVERY_RATE) {
            return DELIVERY_PRICE;
        }

        return 0;
    }

    @computed
    get cartTotalPrice(): number {
        return this.cartTotalProductsPrice + this.deliveryPrice;
    }

    @computed
    get cartTotalCount(): number {
        return cartStore.cartItems.reduce(
            (acc, {productsCount}) => acc + productsCount,
            0,
        );
    }

    @action
    getCartItems = async () => {
        const {cartItems} = cartStore;

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
