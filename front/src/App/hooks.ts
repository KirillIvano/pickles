import {useStore} from '@/hooks/useStore';
import {userStore} from '@/store/stores/user';
import {runAfterRender} from '@/util/runAfterRender';


export const useAppInit = () => {
    const {categoriesStore, cartStore} = useStore();

    categoriesStore.getCategories();
    userStore.initUser();
    runAfterRender(cartStore.initCarts);
};
