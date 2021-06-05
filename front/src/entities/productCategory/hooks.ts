import {useStore} from '@/hooks/useStore';


export const useCategoriesStore = () => useStore().categoriesStore;
export const useCategoryById = (categoryId: number) =>
    useCategoriesStore().categoriesPreviews.find(({id}) => id === categoryId);
