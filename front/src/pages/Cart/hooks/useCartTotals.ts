import {useCartStore} from '@/entities/cart/hooks';
import {useProductStore} from '@/entities/product/hooks';
import {useUserStore} from '@/entities/user/hooks';


export const useCartTotals = (): {count: number; price: number} => {
    const {retailType} = useUserStore();
    const {cartItems} = useCartStore(retailType);
    const productsStore = useProductStore();

    const totals = cartItems.reduce(
        (acc, {productId, productsCount}) => {
            const product = productsStore.getProductPreviews().get(productId);
            if (!product) return acc;

            acc.count += productsCount;
            acc.price += product.price * productsCount;

            return acc;
        },
        {count: 0, price: 0},
    );

    return totals;
};
