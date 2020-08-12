import {useContext} from 'react';

import {StoreContext} from '@/contexts/StoreContext';


export const useStore = () => useContext(StoreContext);
