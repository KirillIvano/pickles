import {UserRetailType} from '@/entities/user/types';
import {getDeliveryConfigByRetail} from '@/util/getDeliveryConfigByRetail';


const RETAIL_WARNINGS = (() => {
    const {minRate} = getDeliveryConfigByRetail(UserRetailType.RETAIL);

    return [
        `Минимальная сумма заказа ${minRate}₽, доставка бесплатна`,
    ];
})();


const WHOLESALE_WARNINGS = (() => {
    const {minRate, minFreeRate, deliveryPrice} = getDeliveryConfigByRetail(UserRetailType.WHOLE);

    return [
        `Минимальная сумма заказа ${minRate}₽, доставка стоит ${deliveryPrice}₽`,
        `Доставка бесплатна при сумме более ${minFreeRate}₽`,
    ];
})();

const WARNINGS_MAPPING = {
    [UserRetailType.RETAIL]: RETAIL_WARNINGS,
    [UserRetailType.WHOLE]: WHOLESALE_WARNINGS,
};

export const getRetailWarnings = (type: UserRetailType) => WARNINGS_MAPPING[type];
