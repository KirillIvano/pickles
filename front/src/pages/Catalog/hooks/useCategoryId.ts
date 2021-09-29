import {useQuery} from '@/hooks/useQuery';

export const useCategoryId = (): number | null => +useQuery<{categoryId: string}>().categoryId || null;