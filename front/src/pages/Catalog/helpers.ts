import {ProductPreviewType} from '@/entities/product/types';

import {SortingPolicy} from './contexts/ProductFilter';


type ProductSorter = (a: ProductPreviewType, b: ProductPreviewType) => number;

const priceDescProductSort: ProductSorter = ({price: p1}, {price: p2}) => p2 - p1;
const priceAscProductSort: ProductSorter = ({price: p1}, {price: p2}) => p1 - p2;
const alphabeticSort: ProductSorter = ({name: n1}, {name: n2}) => n1 > n2 ? 1 : -1;


type ProductSortingFunction = (products: ProductPreviewType[])
    => ProductPreviewType[];

const createSortingFunction = (sorted: ProductSorter): ProductSortingFunction =>
    (products: ProductPreviewType[]) => {
        const productsCopy = [...products];

        productsCopy.sort(sorted);

        return productsCopy;
    };

const emptySort = (previews: ProductPreviewType[]) => previews;
const sortByProductDesc = createSortingFunction(priceDescProductSort);
const sortByProductAsc = createSortingFunction(priceAscProductSort);
const sortAlphabetic = createSortingFunction(alphabeticSort);


const SORTING_POLICIES_HANDLERS: Record<SortingPolicy, ProductSortingFunction> = {
    'none': emptySort,
    'price_desc': sortByProductDesc,
    'price_asc': sortByProductAsc,
    'alphabetic': sortAlphabetic,
};

const SORTING_POLICIES_NAMES: Record<SortingPolicy, string> = {
    'none': 'Без сортировки',
    'price_desc': 'Подороже',
    'price_asc': 'Подешевле',
    'alphabetic': 'По алфавиту',
};


export const getSortingPolicyName = (policy: SortingPolicy) =>
    SORTING_POLICIES_NAMES[policy];

export const sortProducts = (
    productPreviews: ProductPreviewType[],
    policy: SortingPolicy,
) => policy ? SORTING_POLICIES_HANDLERS[policy](productPreviews) : productPreviews;

export const getSortingPolicies = (): SortingPolicy[] =>
    ['none', 'alphabetic', 'price_asc', 'price_desc'];
