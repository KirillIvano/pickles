import {action, observable} from 'mobx';

import {getFeaturingProduct} from '@/services/product';
import {productStore} from '@/store/stores/products';
import { ProductPreviewType } from '@/entities/product/types';


export class FeaturingStore {
    @observable
    public featuringLoadingInProgress = true;
    @observable
    public featuringLoadingError?: string;

    @observable
    public featuringId?: number;

    @action
    getFeaturing = async () => {
        this.resetGetFeaturing();

        const res = await getFeaturingProduct();

        if (res.ok) {
            const {data} = res;
            const {product} = data;

            if (typeof product.id === 'number') {
                productStore.addProductPreviews([product as ProductPreviewType]);
                this.featuringId = product.id;
            } else {
                this.featuringLoadingError = 'Продукт дня не найден';
            }
        } else {
            const {error} = res;

            this.featuringLoadingError = error;
        }

        this.featuringLoadingInProgress = false;
    }

    private resetGetFeaturing = () => {
        this.featuringLoadingInProgress = true;
        this.featuringLoadingError = undefined;
    }
}

export const featuringStore = new FeaturingStore();
