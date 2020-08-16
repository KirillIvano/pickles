import { clientifyProductPreview } from '@/entities/product/transformers';
import { getSingleProductPreview } from '@/services/product';
import { productStore } from '@/store/stores/products';
import {observable, action} from 'mobx';

class CartModalStore {
    @observable
    productLoadingError: null | string = null;

    @action
    getProductPreview = async (productId: number) => {
        const productGetRes = await getSingleProductPreview(productId);

        if (productGetRes.ok === false) {
            this.productLoadingError = productGetRes.error;
        } else {
            const productPreview = productGetRes.data.product;
            productStore.addProductPreviews(
                [clientifyProductPreview(productPreview)],
            );
        }
    }
}

export const cartModalStore = new CartModalStore();
