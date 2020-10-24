import {CartItemType} from './types';


export interface CartInterface {
    cartItems: CartItemType[];
    itemsCount: number;

    getItemCount: (productId: number) => number | undefined;
    getCartItemById: (productId: number) => CartItemType | undefined;
    addProductToCart: (productId: number) => void;
    clearCart:  () => void;
    removeCartItem: (productId: number) => void;
    updateProductCount: (productId: number, currency: number) => void;
    initCart: () => void;
}
