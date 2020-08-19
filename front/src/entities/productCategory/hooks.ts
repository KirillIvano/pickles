import {useStore} from '@/hooks/useStore';

import {CategoryPreview} from './types';


export const useCategoriesStore = () => useStore().categoriesStore;
export const useCategoryById = (categoryId: number) =>
    useCategoriesStore().categoriesPreviews.find(({id}) => id === categoryId) as CategoryPreview;
