import {observable, action} from 'mobx';

import {ProductPreviewType, ProductType} from '@/entities/product/types';


class ProductStore {
    @observable private _products: Map<number, ProductType> = new Map();
    @observable private _productPreviews: Map<number, ProductPreviewType> = new Map();

    getProductPreviews() {
        return this._productPreviews;
    }

    getProducts() {
        return this._products;
    }

    getProductById(productId: number) {
        return this._products.get(productId);
    }
    getProductPreviewById(productId: number) {
        return this.getProductPreviews().get(productId);
    }

    @action
    addProduct(product: ProductType) {
        this._products.set(product.id, product);
    }

    @action
    addProductPreviews(previews: ProductPreviewType[]) {
        previews.forEach(
            preview => this._productPreviews.set(preview.id, preview),
        );
    }
}


export const productStore = new ProductStore();
