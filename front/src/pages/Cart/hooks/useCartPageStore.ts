import {createContext, useContext} from 'react';

import {cartPageStorage} from '../localStorage';


export const CartPageStoreContext = createContext(cartPageStorage);

export const useCartPageStore = () => useContext(CartPageStoreContext);
