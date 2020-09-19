import {useEffect} from 'react';


export const useScrollTop = () =>
    useEffect(() => scrollTo({top: 0, behavior: 'smooth'}), []);
