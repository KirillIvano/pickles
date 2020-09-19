import {useStore} from '@/hooks/useStore';

export const useOrdersStore = () => useStore().orderStore;
export const useOrderById = (orderId: number) => {
    const ordersStore = useOrdersStore();

    return ordersStore.orders.get(orderId);
};
