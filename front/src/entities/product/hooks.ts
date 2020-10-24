import {useStore} from '@/hooks/useStore';

import {ProductPreviewType, ProductType} from './types';


export const useProductStore = () => useStore().productStore;
export const useProductPreviewById = (productId: number) => {
    const productStore = useProductStore();

    return productStore.getProductPreviews().get(productId) as ProductPreviewType;
};

export const useProductById = (productId: number) => {
    const productStore = useProductStore();

    return productStore.getProducts().get(productId) as ProductType;
};
