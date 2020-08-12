import {useHistory} from 'react-router';
import qs from 'query-string';

import {useQuery} from '@/hooks/useQuery';

export const useCategoryIdUpdater = () => {
    const history = useHistory();
    const search = useQuery<{categoryId?: string}>();

    return (id?: number) => {
        const updatedSearch = {...search};

        if (!id) {
            delete updatedSearch.categoryId;
        } else {
            updatedSearch.categoryId = `${id}`;
        }

        history.push({
            pathname: '/catalog',
            search: qs.stringify(updatedSearch),
        });
    };
};