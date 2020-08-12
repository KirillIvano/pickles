import {request} from '@/util/request';
import {getRequestUrl} from '@/util/getRequestUrl';

import {ProductPreviewDto, CategoryPreviewDto, ProductDto} from './dto';


export const getProductPreviews = (categoryId?: number) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/product/all',
            categoryId ? {categoryId} : undefined,
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
