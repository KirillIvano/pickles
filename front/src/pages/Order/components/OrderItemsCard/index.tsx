import React from 'react';
import {observer} from 'mobx-react-lite';

import {useOrderById} from '@/entities/order/hooks';

import styles from './styles.scss';
import {OrderInfoCard} from '..';


type OrderItemsCardProps = {
    orderId: number;
}

const OrderItemsCard = ({orderId}: OrderItemsCardProps) => {
    const order = useOrderById(orderId);
    const totalPrice = order?.items.reduce(
        (acc, {price, quantity}) => acc + price * quantity,
        0,
    ) || 0;

    if (!order) return null;
    const {items} = order;

    return (
        <OrderInfoCard caption={'Корзина'} className={styles.itemsCard}>
            <ul>
                {items.map(({price, quantity, name, productId}) => (
                    <li className={styles.item} key={productId}>
                        <span>{name}</span>
                        <span className={styles.value}>{quantity} x {price} ₽</span>
                    </li>
                ))}
            </ul>

            <p className={styles.totals}>
                <span>сумма</span>
                <span className={styles.totalSum}>
                    {totalPrice} ₽
                </span>
            </p>
        </OrderInfoCard>
    );
};

export default observer(OrderItemsCard);
