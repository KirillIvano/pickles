import React from 'react';

import {SearchInput} from '@/uikit';
import {useDeviceType} from '@/contexts/DeviceContext';

import {useProductFiltersContext} from './../../hooks/useFiltersContext';
import styles from './styles.scss';


const ProductsSearch = () => {
    const {setSearchValue} = useProductFiltersContext();
    const device = useDeviceType();
    const inputsSize = device === 'mobile' ? 'lg' : 'sm';

    return (
        <SearchInput
            sizing={inputsSize}
            wrapperClassName={styles.productSearch}
            setSearchValue={setSearchValue}
        />
    );
};

export default ProductsSearch;
