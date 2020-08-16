import {useContext, createContext} from 'react';

import {cartModalStore} from './localStore';


export const CartModalStoreContext = createContext(cartModalStore);

export const useCartModalStore = () =>
    useContext(CartModalStoreContext);
