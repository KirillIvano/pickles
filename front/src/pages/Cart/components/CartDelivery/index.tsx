import {observer} from 'mobx-react-lite';
import React from 'react';
import classnames from 'classnames';

import {ProgressBar} from '@/uikit';
import {useUserStore} from '@/entities/user/hooks';
import {getDeliveryConfigByRetail} from '@/util/getDeliveryConfigByRetail';

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
    const {cartTotalProductsPrice} = useCartPageStore();
    const {retailType} = useUserStore();

    const {minFreeRate, minRate} = getDeliveryConfigByRetail(retailType);

    const minProgress = cartTotalProductsPrice / minRate;
    const freeDeliveryProgress = cartTotalProductsPrice / minFreeRate;

    return (
        <div className={classnames(className, styles.deliveryInfo)}>
            <CartDeliveryItem
                progress={minProgress}
                caption={minProgress < 1 ?
                    `${minRate - cartTotalProductsPrice}₽ до возможности заказать` :
                    'Вы можете сделать заказ'
                }
            />

            <CartDeliveryItem
                progress={freeDeliveryProgress}
                caption={freeDeliveryProgress < 1 ?
                    `${minFreeRate - cartTotalProductsPrice}₽ до бесплатной доставки` :
                    'Доставка бесплатна'
                }
            />
        </div>
    );
});

export default CartDelivery;
