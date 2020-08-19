import React, {useCallback} from 'react';

export const useDebouncedEventHandler = <TEvent extends React.SyntheticEvent,>(
    handler: (e: TEvent) => void,
    delayInMs: number,
) => {
    return useCallback((e: TEvent) => {
        let timeout: number | null = null;

        e.persist();
        if (timeout) clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            handler(e);
            timeout = null;
        }, delayInMs);
    }, []);
};
