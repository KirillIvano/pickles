import {productStore} from './stores/products';
import {categoriesStore} from './stores/productCategories';
import {cartStore} from './stores/cart';

export const appStore = {
    productStore,
    categoriesStore,
    cartStore,
};
