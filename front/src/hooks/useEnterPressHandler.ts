import React, {useCallback} from 'react';


export type InteractionEventBase = {
    preventDefault: () => void;
    stopPropagation: () => void;
}

export const useEnterPressHandler = (
    handler: (e: InteractionEventBase) => void,
) => useCallback(
    (e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === 'Space') && handler(e),
    [handler],
);
