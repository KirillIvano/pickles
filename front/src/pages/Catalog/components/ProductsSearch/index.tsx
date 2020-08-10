import React from 'react';

import {SearchInput} from '@/uikit';

import {useProductFiltersContext} from './../../hooks/useFiltersContext';

const ProductsSearch = () => {
    const {setSearchValue} = useProductFiltersContext();

    return (
        <SearchInput setSearchValue={setSearchValue} />
    );
};

export default ProductsSearch;
