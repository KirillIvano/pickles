import {request} from '@/util/request';
import {getRequestUrl} from '@/util/getRequestUrl';
import {UserRetailType} from '@/entities/user/types';
import {clearFalsy} from '@/util/whitelist';

import {ProductPreviewDto, CategoryPreviewDto, ProductDto} from './dto';
import {ProductGroup} from '@/entities/productGroup/types';


export type GetProductPreviewsParams = {
    categoryId: number | null;
    groupId: number | null;
    retailType?: UserRetailType;
}
export const getProductPreviews = ({categoryId, retailType, groupId}: GetProductPreviewsParams, signal?: AbortSignal) =>
    request<{products: ProductPreviewDto[]}>(
        getRequestUrl(
            '/api/productPreview',
            {
                ...clearFalsy({categoryId, compilationId: groupId}),
                retail: retailType === UserRetailType.RETAIL,
            },
        ),
        {signal},
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

export const getProductGroups = () =>
    request<{compilations: ProductGroup[]}>(
        getRequestUrl(
            '/api/compilation/preview',
        ),
    );

export const getProduct = (productId: number) =>
    request<{product: ProductDto}>(
        getRequestUrl(`/api/product/${productId}`),
    );

export const getFeaturingProduct = () =>
    request<{product: ProductPreviewDto | null}>(
        getRequestUrl('/api/productPreview/wholesale/daily'),
    );
