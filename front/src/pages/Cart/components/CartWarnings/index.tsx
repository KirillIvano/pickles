import React from 'react';
import classnames from 'classnames';
import {Col, Row} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {useUserStore} from '@/entities/user/hooks';

import styles from './styles.scss';
import {getRetailWarnings} from './util';


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


const CartWarnings = observer(() => {
    const {retailType} = useUserStore();

    return (
        <Row>
            {getRetailWarnings(retailType).map((warning, ind) => (
                <Col key={ind} xs={12} md={4}>
                    <CartWarning>
                        {warning}
                    </CartWarning>
                </Col>
            ))}
        </Row>
    );
});

export default CartWarnings;
