import {observable, action, computed} from 'mobx';

import {ProductPreviewType} from '@/entities/product/types';
import {productStore} from '@/entities/product/store';
import {getProductPreviews as fetchProducts} from '@/services/product';
import {clientifyProductPreview} from '@/entities/product/transformers';


class CatalogStore {
    @observable.ref
    productIds: number[] = [];
    @observable
    categoryId: number | null = null;

    @observable
    productsLoadingInProgress = false;
    @observable
    productsGettingError: string | null = null;

    @computed
    get edgePrices() {
        const prices = this.productIds.map(
            productId => (
                productStore
                    .productPreviews
                    .get(productId) as ProductPreviewType
            ).price,
        );

        const minPrice = Math.min(...prices, Number.MAX_SAFE_INTEGER);
        const maxPrice = Math.max(...prices, minPrice);

        return {maxPrice, minPrice};
    }

    @action
    getProducts = async (categoryId?: number) => {
        this.productsGettingError = null;
        this.productsLoadingInProgress = true;

        const productsRes = await fetchProducts(categoryId);

        if (productsRes.ok === false) {
            this.productsGettingError = productsRes.error;
        } else {
            const {products} = productsRes.data;

            productStore.addProductPreviews(products.map(clientifyProductPreview));
            this.productIds = products.map(({id}) => id);
        }

        this.productsLoadingInProgress = false;
    }
}


export const catalogStore = new CatalogStore();
