import {useStore} from '@/hooks/useStore';
import {UserRetailType} from '@/entities/user/types';


export const useCartStore = (retailType: UserRetailType) => useStore().cartStore.getCart(retailType);
export const useCartItemById = (productId: number, retailType=UserRetailType.WHOLE) => {
    const cart = useCartStore(retailType);

    return cart.getCartItemById(productId);
};

