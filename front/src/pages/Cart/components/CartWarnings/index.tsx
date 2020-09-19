import React from 'react';
import classnames from 'classnames';
import {Col, Row} from 'react-flexbox-grid';

import {
    DELIVERY_PRICE,
    FREE_DELIVERY_RATE,
    MIN_DELIVERY_PRICE,
} from '@/constants/delivery';

import styles from './styles.scss';


type CartWarningProps = {
    children: React.ReactNode;

    className?: string;
}

const CartWarning = ({
    children,
    className,
}: CartWarningProps) => (
    <div className={classnames(
        className,
        styles.cartWarning,
    )}>
        {children}
    </div>
);

const CartWarnings = () => {
    return (
        <Row>
            <Col xs={12} md={4}>
                <CartWarning>
                    {
                        `Минимальная сумма заказа ${MIN_DELIVERY_PRICE}₽` +
                        `, доставка стоит ${DELIVERY_PRICE}₽`
                    }
                </CartWarning>
            </Col>
            <Col xs={12} md={4}>
                <CartWarning>Доставка бесплатна при сумме более {FREE_DELIVERY_RATE}₽</CartWarning>
            </Col>
        </Row>
    );
};

export default CartWarnings;
