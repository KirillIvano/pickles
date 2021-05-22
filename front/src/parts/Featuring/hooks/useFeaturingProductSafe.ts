import {useProductPreviewById} from '@/entities/product/hooks';
import {ProductPreviewType} from '@/entities/product/types';

import {useFeaturingIdSafe} from './useFeaturingIdSafe';


export const useFeaturingProductSafe = (): ProductPreviewType => {
    const featuringId = useFeaturingIdSafe();

    return useProductPreviewById(featuringId);
};
