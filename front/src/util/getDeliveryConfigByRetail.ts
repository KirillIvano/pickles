import {UserRetailType} from '@/entities/user/types';
import * as SETTINGS from '@/constants/delivery';


export type DeliveryConfig = {
    minRate: number;
    minFreeRate: number;
    deliveryPrice: number;
}

export const DELIVERY_CONFIGS: Record<UserRetailType, DeliveryConfig> = {
    [UserRetailType.RETAIL]: {
        minRate: SETTINGS.MIN_DELIVERY_PRICE_RETAIL,
        minFreeRate: SETTINGS.FREE_DELIVERY_RATE_RETAIL,
        deliveryPrice: SETTINGS.DELIVERY_PRICE_RETAIL,
    },
    [UserRetailType.WHOLE]: {
        minRate: SETTINGS.MIN_DELIVERY_PRICE_WHOLESALE,
        minFreeRate: SETTINGS.FREE_DELIVERY_RATE_WHOLESALE,
        deliveryPrice: SETTINGS.DELIVERY_PRICE_WHOLESALE,
    },
};

export const getDeliveryConfigByRetail = (retailType: UserRetailType) => DELIVERY_CONFIGS[retailType];
