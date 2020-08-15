import {useContext, createContext} from 'react';

import {productPageStore} from './../localStore';

export const ProductPageStoreContext = createContext(productPageStore);

export const useProductPageStore = () => useContext(ProductPageStoreContext);
