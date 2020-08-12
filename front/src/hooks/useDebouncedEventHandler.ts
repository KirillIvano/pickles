import React, {useCallback} from 'react';

export const useDebouncedEventHandler = <TEvent extends React.SyntheticEvent,>(
    handler: (e: TEvent) => void,
    delayInMs: number,
) => {
    let timeout: number | null = null;

    return useCallback((e: TEvent) => {
        e.persist();
        if (timeout) clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            handler(e);
            timeout = null;
        }, delayInMs);
    }, []);
};
