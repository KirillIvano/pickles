import {useCartStore} from '@/entities/cart/hooks';
import {useProductStore} from '@/entities/product/hooks';


export const useCartTotals = (): {count: number; price: number} => {
    const {cartItems} = useCartStore();
    const {productPreviews} = useProductStore();

    const totals = cartItems.reduce(
        (acc, {productId, productsCount}) => {
            const product = productPreviews.get(productId);
            if (!product) return acc;

            acc.count += productsCount;
            acc.price += product.price * productsCount;

            return acc;
        },
        {count: 0, price: 0},
    );

    return totals;
};
