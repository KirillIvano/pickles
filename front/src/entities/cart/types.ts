type CartItemType = {
    cartId: number;
    productId: number;
    productsCount: number;
}

type Cart = {
    products: CartItemType[];
    isFinished: boolean;
}

type Offer = {
    date: number;
}
