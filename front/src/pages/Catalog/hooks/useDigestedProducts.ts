import {useProductStore} from '@/entities/product/hooks';
import {ProductPreviewType} from '@/entities/product/types';

import {useProductFiltersContext} from './useFiltersContext';
import {sortProducts} from '../helpers';
import {useCatalogStoreContext} from './useCatalogStoreContext';


export const useDigestedProducts = () => {
    const {productIds: rawProductsIds} = useCatalogStoreContext();
    const productsStore = useProductStore();
    const {
        maxPrice,
        minPrice,
        searchValue,
        sortingPolicy,
    } = useProductFiltersContext();

    const unsortedProducts = rawProductsIds
        .map(productId => productsStore.productPreviews.get(productId) as ProductPreviewType)
        .filter(({price}) => price >= minPrice && price <= maxPrice)
        .filter(({name}) => name.indexOf(searchValue) !== -1);

    return sortProducts(unsortedProducts, sortingPolicy);
};
