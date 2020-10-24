import {useState, useCallback, useEffect} from 'react';

import {useUpdateOnFilterChange} from '../../../hooks/useUpdateOnFiltersChange';
import {useCategoryId} from '../../../hooks/useCategoryId';


const PARTIAL_SHOW_LEN = 21;

export const useShownProductsCount = (): {showMore: () => void; shownCount: number} => {
    const categoryId = useCategoryId();
    const [shownCount, setShownCount] = useState(PARTIAL_SHOW_LEN);

    const showMore = useCallback(
        () => setShownCount(shownCount + PARTIAL_SHOW_LEN),
        [shownCount],
    );

    const resetShownCount = useCallback(
        () => setShownCount(PARTIAL_SHOW_LEN),
        [setShownCount],
    );

    useUpdateOnFilterChange(resetShownCount);
    useEffect(resetShownCount, [categoryId]);

    return {showMore, shownCount};
};
