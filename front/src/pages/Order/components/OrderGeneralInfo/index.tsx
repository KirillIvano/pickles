import React from 'react';

import styles from './styles.scss';


type OrderGeneralInfoProps = {
    orderId: number;
}

const OrderGeneralInfo = ({orderId}: OrderGeneralInfoProps) => {
    return (
        <div className={styles.orderGeneralInfo}>
            <h1 className={styles.orderHeadline}>Заказ №{orderId}</h1>
        </div>
    );
};
export default OrderGeneralInfo;
