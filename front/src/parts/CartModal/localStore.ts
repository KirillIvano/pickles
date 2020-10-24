import {observable, action} from 'mobx';

import {clientifyProductPreview} from '@/entities/product/transformers';
import {getSingleProductPreview} from '@/services/product';
import {productStore} from '@/store/stores/products';


class CartModalStore {
    @observable
    productLoadingError: null | string = null;

    @action
    getProductPreview = async (productId: number) => {
        const productGetRes = await getSingleProductPreview(productId);

        if (productGetRes.ok === false) {
            this.productLoadingError = productGetRes.error;
        } else {
            const productPreviews = productGetRes.data.products;

            productStore.addProductPreviews(
                productPreviews.map(clientifyProductPreview),
            );
        }
    }
}

export const cartModalStore = new CartModalStore();
