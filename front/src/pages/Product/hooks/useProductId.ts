import {useParams} from 'react-router-dom';

export const useProductId = () => {
    const {productId} = useParams<{productId: string}>();

    return +productId;
};
