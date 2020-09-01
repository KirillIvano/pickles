import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type OrderInfoCardProps = {
    children: React.ReactNode;
    caption: string;

    className?: string;
}

const OrderInfoCard = ({
    children,
    caption,
    className,
}: OrderInfoCardProps) => (
    <div className={classnames(styles.orderCard, className)}>
        <h2 className={styles.caption}>{caption}</h2>
        {children}
    </div>
);

export default OrderInfoCard;
