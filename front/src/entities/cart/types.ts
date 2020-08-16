export type CartItemType = {
    productId: number;
    productsCount: number;
}

export type CartType = {
    cartItems: CartItemType[];
}

export type Offer = {
    date: number;
    cartId: number;
}
