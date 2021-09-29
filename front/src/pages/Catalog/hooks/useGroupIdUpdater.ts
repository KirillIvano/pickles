import {useHistory} from 'react-router';
import qs from 'query-string';

import {useQuery} from '@/hooks/useQuery';
import {UserRetailType} from '@/entities/user/types';

import {useCatalogRetailType} from './useCatalogRetailType';


export const useGroupIdUpdater = () => {
    const history = useHistory();
    const search = useQuery<{groupId?: string; categoryId?: string}>();
    const retailType = useCatalogRetailType();

    return (id?: number | null) => {
        const updatedSearch = {...search};

        delete updatedSearch.categoryId;
        if (!id) {
            delete updatedSearch.groupId;
        } else {
            updatedSearch.groupId = `${id}`;
        }

        history.push({
            pathname: retailType === UserRetailType.RETAIL ? '/catalog/retail' : '/catalog',
            search: qs.stringify(updatedSearch),
        });
    };
};
