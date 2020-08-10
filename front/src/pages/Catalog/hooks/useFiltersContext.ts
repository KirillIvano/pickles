import {useContext} from 'react';

import {ProductsFilterContext} from './../contexts/ProductFilter';


export const useProductFiltersContext = () => useContext(ProductsFilterContext);
