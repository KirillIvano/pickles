import {useContext} from 'react';

import {CartModalContext} from '@/contexts/CartModalContext';


export const useCartModalContext = () => useContext(CartModalContext);
