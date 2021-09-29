import {productStore} from './stores/products';
import {categoriesStore} from './stores/productCategories';
import {cartStore} from './stores/cart';
import {orderStore} from './stores/order';
import {userStore} from './stores/user';
import {groupsStore} from './stores/productGroups';

export const appStore = {
    productStore,
    groupsStore,
    categoriesStore,
    cartStore,
    orderStore,
    userStore,
};
