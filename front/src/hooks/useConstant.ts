import {useEffect, useRef} from 'react';
import type {DependencyList} from 'react';

export const useConstant = <TValue, TDeps extends DependencyList>(
    getter: () => TValue,
    deps?: TDeps,
): TValue => {
    const valueRef = useRef<TValue>();
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        valueRef.current = getter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    if (isFirstRenderRef.current) {
        valueRef.current = getter();
        isFirstRenderRef.current = false;
    }

    return valueRef.current as TValue;
};
