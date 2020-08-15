import {observable, action} from 'mobx';

import {getProduct} from '@/services/product';
import {productStore} from '@/store/stores/products';
import {clientifyProduct} from '@/entities/product/transformers';

export class ProductPageStore {
    @observable
    productGettingError: string | null = null;
    @observable
    productGettingInProgress = false;

    @action
    getProduct = async (productId: number) => {
        this.productGettingInProgress = true;
        this.productGettingError = null;

        const productRes = await getProduct(productId);

        if (productRes.ok === false) {
            this.productGettingError = productRes.error;
        } else {
            const {product} = productRes.data;
            productStore.addProduct(clientifyProduct(product));
        }

        this.productGettingInProgress = false;
    }
}

export const productPageStore = new ProductPageStore();
