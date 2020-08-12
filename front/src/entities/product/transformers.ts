import {ProductPreviewDto} from '@/services/product/dto';
import {getImageUrl} from '@/util/getImageUrl';

import {ProductPreviewType} from './types';


export const clientifyProductPreview = (productPreview: ProductPreviewDto): ProductPreviewType => {
    const productPreviewCopy = {...productPreview};

    productPreviewCopy.image = getImageUrl(productPreview.image);

    return productPreviewCopy;
};
