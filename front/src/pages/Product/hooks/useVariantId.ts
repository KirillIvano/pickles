import {useParams} from 'react-router-dom';

export const useVariantId = () => {
    const {productId} = useParams<{productId: string}>();

    return +productId;
};
