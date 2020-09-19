import React from 'react';
import {observer} from 'mobx-react-lite';

import {MIN_DELIVERY_PRICE} from '@/constants/delivery';

import {CheckoutForm} from './../';
import {useCartPageStore} from '../../hooks/useCartPageStore';


type CheckoutProps = {
    className?: string;
}

const Checkout = observer(({className}: CheckoutProps) => {
    const {cartTotalProductsPrice} = useCartPageStore();

    return (
        <div className={className}>
            {MIN_DELIVERY_PRICE <= cartTotalProductsPrice ?
                <CheckoutForm /> :
                <p>Вы пока что не можете оформить заказ</p>
            }
        </div>
    );
});

export default Checkout;
