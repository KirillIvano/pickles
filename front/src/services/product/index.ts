import {request} from '@/util/request';
import {getRequestUrl} from '@/util/getRequestUrl';
import {UserRetailType} from '@/entities/user/types';
import {clearFalsy} from '@/util/whitelist';

import {ProductPreviewDto, CategoryPreviewDto, ProductDto} from './dto';


export const getProductPreviews = (categoryId?: number, retailType=UserRetailType.WHOLE) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            {
                ...clearFalsy({categoryId}),
                retail: retailType === UserRetailType.RETAIL,
            },
        ),
    );

export const getSingleProductPreview = (productId: number) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            {productIds: productId},
        ),
    );

export const getPreviewsByIds = (productIds: number[], retailType=UserRetailType.WHOLE) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            {
                productIds: productIds.join(','),
                retail: retailType === UserRetailType.RETAIL,
            },
        ),
    );


export const getProductCategoriesPreviews = () =>
    request<{categories: CategoryPreviewDto[]}>(
        getRequestUrl(
            '/api/category/all',
        ),
    );

export const getProduct = (productId: number) =>
    request<{product: ProductDto}>(
        getRequestUrl(`/api/product/${productId}`),
    );
