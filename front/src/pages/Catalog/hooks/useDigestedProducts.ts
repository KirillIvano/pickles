import {useProductStore} from '@/entities/product/hooks';
import {ProductPreviewType} from '@/entities/product/types';

import {useProductFiltersContext} from './useFiltersContext';
import {sortProducts} from '../helpers';
import {useCatalogStoreContext} from './useCatalogStoreContext';
import {useCatalogRetailType} from './useCatalogRetailType';


export const useDigestedProducts = () => {
    const {productIds: rawProductsIds} = useCatalogStoreContext();
    const retailType = useCatalogRetailType();

    const productsStore = useProductStore();
    const {
        maxPrice,
        minPrice,
        searchValue,
        sortingPolicy,
    } = useProductFiltersContext();

    const unsortedProducts = rawProductsIds
        .map(productId => productsStore.getProductPreviews(retailType).get(productId) as ProductPreviewType)
        .filter(({price}) => price >= minPrice && price <= maxPrice)
        .filter(({name}) => name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);

    return sortProducts(unsortedProducts, sortingPolicy);
};
