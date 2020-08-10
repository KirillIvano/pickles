import React from 'react';

import {lorem} from '@/util/lorem';


export type SortingPolicy = 'price_asc' | 'price_desc' | 'alphabetic' | 'none';

export type ProductsFilterContextType = {
    minPrice: number;
    maxPrice: number;
    searchValue: string;
    sortingPolicy: SortingPolicy;

    setMinPrice: (minPrice: number) => void;
    setMaxPrice: (maxPrice: number) => void;
    setSearchValue: (searchString: string) => void;
    setSortingPolicy: (policy: SortingPolicy) => void;
}

const DEFAULT_VALUE: ProductsFilterContextType = {
    minPrice: 0,
    maxPrice: 0,
    searchValue: '',
    sortingPolicy: 'none',

    setMaxPrice: lorem,
    setMinPrice: lorem,
    setSearchValue: lorem,
    setSortingPolicy: lorem,
};


export const ProductsFilterContext = React.createContext<ProductsFilterContextType>(DEFAULT_VALUE);
