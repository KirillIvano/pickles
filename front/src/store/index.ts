import {productStore} from './stores/products';
import {categoriesStore} from './stores/productCategories';


export const appStore = {
    productStore: productStore,
    categoriesStore: categoriesStore,
};
