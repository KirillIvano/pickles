import React from 'react';

import {useOrderById} from '@/entities/order/hooks';

import styles from './styles.scss';
import {OrderInfoCard} from '..';


type ClientCardItemProps = {
    name: string;
    value: string | number;
}

const ClientCardItem = ({name, value}: ClientCardItemProps) =>
    value ? <li className={styles.infoItem}>{name}: {value}</li> : null;


type OrderClientCardProps = {
    orderId: number;
}

const OrderClientCard = ({orderId}: OrderClientCardProps) => {
    const order = useOrderById(orderId);

    if (!order) return null;

    const {
        name,
        phone,
        address,
        email,
    } = order;

    return (
        <OrderInfoCard caption="Получатель">
            <ul className={styles.clientInfo}>
                <ClientCardItem name="имя" value={name} />
                <ClientCardItem name="телефон" value={phone} />
                <ClientCardItem name="аддрес" value={address} />
                <ClientCardItem name="почта" value={email} />
            </ul>
        </OrderInfoCard>
    );
};

export default OrderClientCard;
