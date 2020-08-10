import React, { useMemo } from 'react';

import {useStateWithSetterMemo} from '@/hooks/useStateWithSetterMemo';

import {ProductsFilterContext, SortingPolicy} from './../contexts/ProductFilter';



export const withProductsFiltering = <TProps extends object>(Comp: React.ComponentType<TProps>) =>
    (props: TProps) => {
        const [minPrice, setMinPrice] = useStateWithSetterMemo(0);
        const [maxPrice, setMaxPrice] = useStateWithSetterMemo(Number.MAX_SAFE_INTEGER);
        const [searchValue, setSearchValue] = useStateWithSetterMemo('');
        const [sortingPolicy, setSortingPolicy] = useStateWithSetterMemo<SortingPolicy>('none');

        const value = useMemo(
            () => ({
                minPrice,
                maxPrice,
                searchValue,
                sortingPolicy,

                setMinPrice,
                setMaxPrice,
                setSearchValue,
                setSortingPolicy,
            }),
            [minPrice, maxPrice, searchValue, sortingPolicy],
        );

        return (
            <ProductsFilterContext.Provider
                value={value}
            >
                <Comp {...props} />
            </ProductsFilterContext.Provider>
        );
    };
