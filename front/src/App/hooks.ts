import {useStore} from '@/hooks/useStore';
import {runAfterRender} from '@/util/runAfterRender';

export const useAppInit = () => {
    const {categoriesStore, cartStore} = useStore();

    categoriesStore.getCategories();
    runAfterRender(cartStore.initCart);
};
