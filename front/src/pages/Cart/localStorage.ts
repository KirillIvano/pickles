import {observable, action, computed} from 'mobx';

import {cartStore} from '@/store/stores/cart';
import {productStore} from '@/store/stores/products';
import {getPreviewsByIds} from '@/services/product';
import {clientifyProductPreview} from '@/entities/product/transformers';
import {UserRetailType} from '@/entities/user/types';
import {CartInterface} from '@/entities/cart/interfaces';
import {ProductPreviewType} from '@/entities/product/types';
import {getDeliveryConfigByRetail} from '@/util/getDeliveryConfigByRetail';


interface CartFacadeInterface {
    getCart: (retailType: UserRetailType) => CartInterface;
}

interface ProductStoreInterface {
    getProductPreviewById: (productId: number) => ProductPreviewType | undefined;
    addProductPreviews: (products: ProductPreviewType[]) => void;
}

class CartPageStorageBase {
    constructor(
        private _cartStore: CartFacadeInterface,
        private _productStore: ProductStoreInterface,
        private _retailType: UserRetailType,
    ) {}

    @observable
    cartGettingError: string | null;
    @observable
    cartGettingCompleted = false;

    getCurrentCart(): CartInterface {
        return this._cartStore.getCart(this._retailType);
    }

    @computed
    get cartTotalProductsPrice(): number {
        return this._cartStore.getCart(this._retailType).cartItems.reduce(
            (acc, {productId, productsCount}) => {
                const productPreview = this._productStore.getProductPreviewById(productId);

                return acc + (productPreview ? productPreview.price * productsCount : 0);
            },
            0,
        );
    }

    @computed
    get cartTotalCount(): number {
        return this.getCurrentCart().cartItems.reduce(
            (acc, {productsCount}) => acc + productsCount,
            0,
        );
    }

    @computed
    get deliveryPrice(): number {
        const {minRate, minFreeRate, deliveryPrice} = getDeliveryConfigByRetail(this._retailType);

        if (this.cartTotalProductsPrice < minRate) {
            return 0;
        } else if (this.cartTotalProductsPrice < minFreeRate) {
            return deliveryPrice;
        }

        return 0;
    }

    @computed
    get cartTotalPrice(): number {
        return this.cartTotalProductsPrice + this.deliveryPrice;
    }

    @action
    getCartItems = async () => {
        const {cartItems} = this.getCurrentCart();

        this.cartGettingCompleted = false;
        this.cartGettingError = null;

        const productIds = cartItems.map(({productId}) => productId);

        const productGetRes = await getPreviewsByIds(productIds, this._retailType);

        if (productGetRes.ok === false) {
            this.cartGettingError = productGetRes.error;
        } else {
            const {products} = productGetRes.data;
            this._productStore.addProductPreviews(
                products.map(clientifyProductPreview),
            );
        }

        this.cartGettingCompleted = true;
    }
}

export const CartPageStorage = CartPageStorageBase.bind(null, cartStore, productStore);
