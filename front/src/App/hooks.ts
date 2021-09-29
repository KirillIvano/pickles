import {useStore} from '@/hooks/useStore';
import { groupsStore } from '@/store/stores/productGroups';
import {userStore} from '@/store/stores/user';
import {runAfterRender} from '@/util/runAfterRender';
import {useEffect} from 'react';


export const useAppInit = () => {
    const {categoriesStore, cartStore} = useStore();

    useEffect(() => {
        categoriesStore.getCategories();
        groupsStore.getGroups();
        userStore.initUser();
        runAfterRender(cartStore.initCarts);
    }, [categoriesStore, cartStore]);
};
