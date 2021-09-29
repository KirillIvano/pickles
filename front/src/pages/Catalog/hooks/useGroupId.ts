import {useQuery} from '@/hooks/useQuery';

export const useGroupId = (): number | null => +useQuery<{groupId: string}>().groupId || null;
