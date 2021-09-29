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

    private _abortController: AbortController;

    @observable.ref
    productIds: number[] = [];
    @observable
    categoryId: number | null = null;
    @observable
    groupId: number | null = null;

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
    setCategory = (categoryId: number | null) => {
        this.categoryId = categoryId;
    }

    @action
    setGroup = (groupId: number | null) => {
        this.groupId = groupId;
    }

    @action
    getProducts = async (categoryId: number | null, retailType: UserRetailType | undefined, groupId: number | null) => {
        if (this._abortController) this._abortController.abort();
        this.productsGettingError = null;
        this.productsLoadingInProgress = true;

        const controller = new AbortController();
        this._abortController = controller;

        const {signal} = controller;

        const productsRes = await fetchProducts({categoryId, retailType, groupId}, signal);

        if (signal.aborted) return;
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
