import {observer} from 'mobx-react-lite';
import React from 'react';
import classnames from 'classnames';

import {FREE_DELIVERY_RATE, MIN_DELIVERY_PRICE} from '@/constants/delivery';
import {ProgressBar} from '@/uikit';

import styles from './styles.scss';
import {useCartPageStore} from '../../hooks/useCartPageStore';


type CartDeliveryItemProps = {
    progress: number;
    caption: string;

    className?: string;
}

const CartDeliveryItem = ({
    progress,
    caption,
    className,
}: CartDeliveryItemProps) => {
    return (
        <div className={classnames(
            styles.deliveryInfoItem,
            className,
        )}>
            <ProgressBar progress={progress} />
            <p className={styles.description}>
                {caption}
            </p>
        </div>
    );
};


type CartDeliveryProps = {
    className?: string;
}

const CartDelivery = observer(({className}: CartDeliveryProps) => {
    const {
        cartTotalProductsPrice,
    } = useCartPageStore();

    const minProgress = cartTotalProductsPrice / MIN_DELIVERY_PRICE;
    const freeDeliveryProgress = cartTotalProductsPrice / FREE_DELIVERY_RATE;

    return (
        <div className={classnames(className, styles.deliveryInfo)}>
            <CartDeliveryItem
                progress={minProgress}
                caption={minProgress < 1 ?
                    `${MIN_DELIVERY_PRICE - cartTotalProductsPrice}₽ до возможности заказать` :
                    'Вы можете сделать заказ'
                }
            />

            <CartDeliveryItem
                progress={freeDeliveryProgress}
                caption={freeDeliveryProgress < 1 ?
                    `${FREE_DELIVERY_RATE - cartTotalProductsPrice}₽ до бесплатной доставки` :
                    'Доставка бесплатна'
                }
            />
        </div>
    );
});

export default CartDelivery;
