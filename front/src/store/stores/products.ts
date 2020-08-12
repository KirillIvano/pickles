import {observable, action} from 'mobx';

import {ProductPreviewType, ProductType} from '@/entities/product/types';

class ProductStore {
    @observable products: Map<number, ProductType> = new Map();
    @observable productPreviews: Map<number, ProductPreviewType> = new Map();

    @action
    addProduct(product: ProductType) {
        this.products.set(product.id, product);
    }

    @action
    addProductPreviews(previews: ProductPreviewType[]) {
        previews.forEach(
            preview => this.productPreviews.set(preview.id, preview),
        );
    }
}


export const productStore = new ProductStore();
