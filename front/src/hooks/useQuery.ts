import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import qs from 'query-string';


export const useQuery = <TQuery extends {}>() => {
    const location = useLocation();

    return useMemo(
        () => qs.parse(location.search) as TQuery,
        [location.search],
    );
};
