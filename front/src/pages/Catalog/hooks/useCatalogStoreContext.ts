import {useContext} from 'react';

import {CatalogStoreContext} from '../contexts/CatalogStore';


export const useCatalogStoreContext = () => useContext(CatalogStoreContext);
