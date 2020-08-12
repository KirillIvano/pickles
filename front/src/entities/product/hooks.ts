import {useStore} from '@/hooks/useStore';

import {ProductPreviewType} from './types';

export const useProductStore = () => useStore().productStore;
export const useProductPreviewById = (productId: number) => {
    const productStore = useProductStore();

    return productStore.productPreviews.get(productId) as ProductPreviewType;
};
