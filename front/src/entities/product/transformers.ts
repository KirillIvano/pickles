import {ProductPreviewDto} from '@/services/product/dto';
import {getImageUrl} from '@/util/getImageUrl';

import {ProductPreviewType, ProductType} from './types';


export const clientifyProductPreview = (productPreview: ProductPreviewDto): ProductPreviewType => {
    const productPreviewCopy = {...productPreview};

    productPreviewCopy.image = getImageUrl(productPreview.image);

    return productPreviewCopy;
};

export const clientifyProduct = (product: ProductType): ProductType => {
    const productCopy = {...product};
    productCopy.images = product.images.map(getImageUrl);

    return productCopy;
};
