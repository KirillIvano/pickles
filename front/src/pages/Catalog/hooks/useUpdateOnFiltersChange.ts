import {useEffect} from 'react';
import { useProductFiltersContext } from './useFiltersContext';


export const useUpdateOnFilterChange = (updater: () => void) => {
    const {searchValue, sortingPolicy, maxPrice, minPrice} = useProductFiltersContext();

    useEffect(() => {
        updater();
    }, [searchValue, sortingPolicy, maxPrice, minPrice, updater]);
};
