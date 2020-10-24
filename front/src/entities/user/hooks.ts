import {useStore} from '@/hooks/useStore';

import {UserRetailType, UserStoreInterface} from './types';


export const useUserStore = (): UserStoreInterface => useStore().userStore;
export const useGlobalRetailType = (): UserRetailType => useUserStore().retailType;
