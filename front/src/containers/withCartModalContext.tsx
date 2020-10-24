import React, {useCallback, useState} from 'react';

import {CartModalContext} from '@/contexts/CartModalContext';


export const WithCartModalContext = ({children}: {children: React.ReactNode}) => {
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
            {children}
        </CartModalContext.Provider>
    );
};
