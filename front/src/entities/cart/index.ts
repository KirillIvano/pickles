import {observable, action, computed} from 'mobx';

import {createDebouncer} from '@/util/debounce';
import {UserRetailType} from '@/entities/user/types';

import {CartItemType, CartType} from './types';
import {CartInterface} from './interfaces';


export class CartStore implements CartInterface{
    constructor(private _storageToken: string) {}

    @observable
    private _cartItems = new Map<number, CartItemType>();
    private _saveDebouncer = createDebouncer(600);

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

        this._saveDebouncer.perform(
            () => localStorage.setItem(this._storageToken, stringifiedCart),
        );
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
        this.saveCartState();
    }

    @action
    clearCart = () => {
        this._cartItems.clear();
        this.saveCartState();
    }

    @action
    removeCartItem = (productId: number) => {
        this._cartItems.delete(productId);
        this.saveCartState();
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
        const cartFromMemory: string | null = localStorage.getItem(this._storageToken);
        if (!cartFromMemory) return;

        let cart;
        try {
            cart = JSON.parse(cartFromMemory) as CartType;
        } catch {
            localStorage.removeItem(this._storageToken);
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

const retailCartStore = new CartStore('retailCart');
const wholesaleCartStore = new CartStore('wholesaleCart');


class CartStoreFacade {
    private _cartsMap = new Map<UserRetailType, CartInterface>([
        [UserRetailType.RETAIL, retailCartStore],
        [UserRetailType.WHOLE, wholesaleCartStore],
    ])

    initCarts = () => this._cartsMap.forEach(cart => cart.initCart());
    getCart = (type: UserRetailType) => this._cartsMap.get(type) as CartInterface;
}

export const cartFacade = new CartStoreFacade;
