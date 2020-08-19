import {request} from '@/util/request';
import {getRequestUrl} from '@/util/getRequestUrl';

import {ProductPreviewDto, CategoryPreviewDto, ProductDto} from './dto';


export const getProductPreviews = (categoryId?: number) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            categoryId ? {categoryId} : undefined,
        ),
    );

export const getSingleProductPreview = (productId: number) =>
    request<{product: ProductPreviewDto}>(
        getRequestUrl(
            '/api/productPreview',
            {productIds: productId},
        ),
    );

export const getPreviewsByIds = (productIds: number[]) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            {productIds: productIds.join(',')},
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
