import {useStore} from '@/hooks/useStore';

export const useGroupsStore = () => useStore().groupsStore;
export const useGroupById = (categoryId: number) =>
    useGroupsStore().groupsPreviews.find(({id}) => id === categoryId);
