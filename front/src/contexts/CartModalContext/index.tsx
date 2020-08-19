import {createContext} from 'react';


type CartModalContextType = {
    isModalOpened: boolean;
    currentProductId?: number;

    closeModal: () => void;
    openModal: (productId: number) => void;
}

const DEFAULT_CART_MODAL_CONTEXT: CartModalContextType = {
    isModalOpened: false,
    closeModal: () => void(0),
    openModal: () => void(0),
};

export const CartModalContext = createContext<CartModalContextType>(DEFAULT_CART_MODAL_CONTEXT);
