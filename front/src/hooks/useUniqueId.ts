import {useMemo} from 'react';

import {getUniqueId} from '@/util/getUniqueId';


export const useUniqueId = () => useMemo(getUniqueId, []);
