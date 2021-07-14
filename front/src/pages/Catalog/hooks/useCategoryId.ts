import {useQuery} from '@/hooks/useQuery';

export const useCategoryId = (): number => +useQuery<{categoryId: string}>().categoryId || 0;
