import {useState, useCallback} from 'react';


export const useStateWithSetterMemo = <TState,>(defaultVal: TState) => {
    const [state, setState] = useState<TState>(defaultVal);
    const memoizedSetter = useCallback(setState, []);

    return [state, memoizedSetter] as [typeof state, typeof setState];
};
