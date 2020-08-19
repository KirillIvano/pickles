import {useStore} from '@/hooks/useStore';

import {ProductPreviewType, ProductType} from './types';

export const useProductStore = () => useStore().productStore;
export const useProductPreviewById = (productId: number) => {
    const productStore = useProductStore();

    return productStore.productPreviews.get(productId) as ProductPreviewType;
};

export const useProductById = (productId: number) => {
    const productStore = useProductStore();

    return productStore.products.get(productId) as ProductType;
};
