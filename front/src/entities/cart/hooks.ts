import {useStore} from '@/hooks/useStore';


export const useCartStore = () => useStore().cartStore;
export const useCartItemById = (productId: number) => {
    const cart = useCartStore();

    return cart.getCartItemById(productId);
};

