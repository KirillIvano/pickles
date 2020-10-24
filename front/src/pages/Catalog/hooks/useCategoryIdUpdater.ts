import {useHistory} from 'react-router';
import qs from 'query-string';

import {useQuery} from '@/hooks/useQuery';
import {UserRetailType} from '@/entities/user/types';

import {useCatalogRetailType} from './useCatalogRetailType';


export const useCategoryIdUpdater = () => {
    const history = useHistory();
    const search = useQuery<{categoryId?: string}>();
    const retailType = useCatalogRetailType();

    return (id?: number) => {
        const updatedSearch = {...search};

        if (!id) {
            delete updatedSearch.categoryId;
        } else {
            updatedSearch.categoryId = `${id}`;
        }

        history.push({
            pathname: retailType === UserRetailType.RETAIL ? '/catalog/retail' : '/catalog',
            search: qs.stringify(updatedSearch),
        });
    };
};
