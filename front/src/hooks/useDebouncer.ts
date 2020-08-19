import {useMemo} from 'react';

import {createDebouncer} from '@/util/debounce';


export const useDebouncer = (delay: number) =>
    useMemo(() => createDebouncer(delay), [delay]);
