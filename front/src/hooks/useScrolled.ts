import {useEffect, useRef, useState} from 'react';

import {useScrollContext} from '@/contexts/ScrollContext';


export const useScrolled = (offset=-1500): {elementRef: React.Ref<Element>; isReached: boolean} => {
    const elementRef = useRef<Element>(null);

    const [isReached, setReached] = useState(false);
    const [elementOffset, setElementOffset] = useState(Number.MAX_VALUE);

    const scrollPos = useScrollContext();

    useEffect(() => {
        const {current: currentElement} = elementRef;
        if (currentElement) {
            setElementOffset(currentElement.getBoundingClientRect().top);
        }
    }, []);

    useEffect(() => {
        if (!isReached && scrollPos > elementOffset + offset) {
            setReached(true);
        }
    }, [scrollPos, offset, elementOffset, isReached]);

    return {
        elementRef,
        isReached: isReached,
    };
};
