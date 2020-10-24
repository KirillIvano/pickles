import {productStore} from './stores/products';
import {categoriesStore} from './stores/productCategories';
import {cartStore} from './stores/cart';
import {orderStore} from './stores/order';
import {userStore} from './stores/user';


export const appStore = {
    productStore,
    categoriesStore,
    cartStore,
    orderStore,
    userStore,
};
