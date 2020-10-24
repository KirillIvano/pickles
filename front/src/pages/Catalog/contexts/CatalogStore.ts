import {createContext} from 'react';

import {CatalogStore} from '../localStore';


export const CatalogStoreContext = createContext(new CatalogStore());
