import {createContext, useContext} from 'react';

import {UserRetailType} from '@/entities/user/types';

import {CartPageStorage} from '../localStorage';


export const CartPageStoreContext = createContext(new CartPageStorage(UserRetailType.WHOLE));

export const useCartPageStore = () => useContext(CartPageStoreContext);
