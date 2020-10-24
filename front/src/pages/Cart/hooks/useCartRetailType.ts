import {useParams} from 'react-router-dom';

import {UserRetailType} from '@/entities/user/types';


export const useCartRetailType = (): UserRetailType => {
    const {type} = useParams<{type: UserRetailType}>();

    return type === UserRetailType.RETAIL ? UserRetailType.RETAIL : UserRetailType.WHOLE;
};
