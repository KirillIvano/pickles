import {observable, action, computed} from 'mobx';

import {CartItemType, CartType} from '@/entities/cart/types';


export class CartStore {
    @observable
    private _cartItems = new Map<number, CartItemType>();

    @computed
    get cartItems() {
        return [...this._cartItems.values()];
    }

    @computed
    get itemsCount() {
        return this._cartItems.size;
    }

    private saveCartState = () => {
        const cartToBeSaved = {cartItems: [...this._cartItems.values()]};
        const stringifiedCart = JSON.stringify(cartToBeSaved);

        localStorage.setItem('cart', stringifiedCart);
    }

    getItemCount = (productId: number) => {
        return this._cartItems.get(productId)?.productsCount;
    }

    getCartItemById = (productId: number) => {
        return this._cartItems.get(productId);
    }

    @action
    addProductToCart = (productId: number) => {
        this._cartItems.set(productId, {productId, productsCount: 1});
        // this.saveCartState();
    }

    @action
    clearCart = () => {
        this._cartItems.clear();
    }

    @action
    removeCartItem = (productId: number) => {
        this._cartItems.delete(productId);
    }

    @action
    updateProductCount = (productId: number, currency: number) => {
        const product = this.getCartItemById(productId);
        if (!product) return;

        product.productsCount = currency;

        this.saveCartState();
    }

    @action
    initCart = () => {
        const cartFromMemory: string | null = localStorage.getItem('cart');
        if (!cartFromMemory) return;

        let cart;
        try {
            cart = JSON.parse(cartFromMemory) as CartType;
        } catch {
            localStorage.removeItem('cart');
            return;
        }

        cart.cartItems.forEach(
            cartItem => this._cartItems.set(
                cartItem.productId,
                cartItem,
            ),
        );
    }
}

export const cartStore = new CartStore();
