import {createContext, useContext} from 'react';

import {checkoutFormStore} from './localStore';


const CheckoutFormStoreContext = createContext(checkoutFormStore);

export const useCheckoutFormStore = () => useContext(CheckoutFormStoreContext);
