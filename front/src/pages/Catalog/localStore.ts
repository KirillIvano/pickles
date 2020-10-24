import {observable, action} from 'mobx';

import {ProductPreviewType} from '@/entities/product/types';
import {productStore} from '@/store/stores/products';
import {getProductPreviews as fetchProducts} from '@/services/product';
import {clientifyProductPreview} from '@/entities/product/transformers';
import {UserRetailType} from '@/entities/user/types';


interface ProductStoreInterface {
    getProductPreviews: () => Map<number, ProductPreviewType>;
    addProductPreviews: (products: ProductPreviewType[]) => void;
}

class CatalogStoreBase {
    constructor(
        private _productStore: ProductStoreInterface,
    ) {}

    @observable.ref
    productIds: number[] = [];
    @observable
    categoryId: number | null = null;

    @observable
    productsLoadingInProgress = false;
    @observable
    productsGettingError: string | null = null;

    getEdgePrices = () => {
        const prices = this.productIds.map(
            productId => (
                this._productStore
                    .getProductPreviews()
                    .get(productId) as ProductPreviewType
            ).price,
        );

        const minPrice = Math.min(...prices, Number.MAX_SAFE_INTEGER);
        const maxPrice = Math.max(...prices, minPrice);

        return {maxPrice, minPrice};
    }

    @action
    getProducts = async (categoryId?: number, retailType?: UserRetailType) => {
        this.productsGettingError = null;
        this.productsLoadingInProgress = true;

        const productsRes = await fetchProducts(categoryId, retailType);

        if (productsRes.ok === false) {
            this.productsGettingError = productsRes.error;
        } else {
            const {products} = productsRes.data;

            this._productStore.addProductPreviews(
                products.map(clientifyProductPreview),
            );
            this.productIds = products.map(({id}) => id);
        }

        this.productsLoadingInProgress = false;
    }
}

export const CatalogStore = CatalogStoreBase.bind(null, productStore);
