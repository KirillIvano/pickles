import {createContext, useContext} from 'react';

import {orderPageStore} from '../localStore';


const OrderPageStoreContext = createContext(orderPageStore);

export const useOrderPageStore = () => useContext(OrderPageStoreContext);
