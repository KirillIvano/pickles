import {createContext, useContext} from 'react';

import {featuringStore} from '../localStore';


export const FeaturingStoreContext = createContext(featuringStore);

export const useFeaturingStore = () => useContext(FeaturingStoreContext);
