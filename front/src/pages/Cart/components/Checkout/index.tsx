import React from 'react';
import {observer} from 'mobx-react-lite';

import {CheckoutForm} from './../';
import {useCartPageStore} from '../../hooks/useCartPageStore';
import { useUserStore } from '@/entities/user/hooks';
import { getDeliveryConfigByRetail } from '@/util/getDeliveryConfigByRetail';


type CheckoutProps = {
    className?: string;
}

const Checkout = observer(({className}: CheckoutProps) => {
    const {cartTotalProductsPrice} = useCartPageStore();
    const {retailType} = useUserStore();

    const {minRate} = getDeliveryConfigByRetail(retailType);

    return (
        <div className={className}>
            {minRate <= cartTotalProductsPrice ?
                <CheckoutForm /> :
                <p>Вы пока что не можете оформить заказ</p>
            }
        </div>
    );
});

export default Checkout;
