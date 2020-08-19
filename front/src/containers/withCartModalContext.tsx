import React, {useCallback, useState} from 'react';

import {CartModalContext} from '@/contexts/CartModalContext';


export const withCartModalContext = <TProps extends {}>(Comp: React.ComponentType) => {
    const MemoizedComp = React.memo(Comp);

    const WrappedComp = (props: TProps) => {
        const [isOpen, setOpened] = useState(false);
        const [currentProductId, setCurrentProductId] = useState<number>();


        const openModal = useCallback((productId: number) => {
            setOpened(true);
            setCurrentProductId(productId);
        }, []);

        const closeModal = useCallback(() => {
            setOpened(false);
        }, []);



        return (
            <CartModalContext.Provider value={{
                isModalOpened: isOpen,
                currentProductId,
                openModal,
                closeModal,
            }}>
                <MemoizedComp {...props} />
            </CartModalContext.Provider>
        );
    };
    WrappedComp.displayName = 'WithCartModal';

    return WrappedComp;
};
