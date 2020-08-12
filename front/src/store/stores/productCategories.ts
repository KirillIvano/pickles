import {action, observable} from 'mobx';

import {getProductCategoriesPreviews} from '@/services/product';

import {CategoryPreview} from '@/entities/productCategory/types';


class CategoriesStore {
    @observable.ref
    categoriesPreviews: CategoryPreview[] = []

    @observable
    categoriesGettingInProgress = false;
    @observable
    categoriesGettingError: string | null = null;


    @action
    async getCategories() {
        this.categoriesGettingInProgress = true;
        this.categoriesGettingError = null;

        const categoriesRes = await getProductCategoriesPreviews();

        if (categoriesRes.ok === false) {
            this.categoriesGettingError = categoriesRes.error;
        } else {
            this.categoriesPreviews = [
                ...categoriesRes.data.categories,
            ];
        }

        this.categoriesGettingInProgress = false;
    }
}


export const categoriesStore = new CategoriesStore();
