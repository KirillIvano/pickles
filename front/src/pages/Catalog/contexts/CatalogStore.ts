import {createContext} from 'react';

import {catalogStore} from '../localStore';


export const CatalogStoreContext = createContext(catalogStore);
