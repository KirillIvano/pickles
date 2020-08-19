import React, { useEffect } from 'react';
import {Col, Row} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {useDeviceType} from '@/contexts/DeviceContext';
import {Grid, PageHeading} from '@/uikit';
import {ProductCartCard} from '@/components';
import {useCartStore} from '@/entities/cart/hooks';

import styles from './styles.scss';
import {Checkout, EmptyCart, CartTotals} from './components';
import {cartPageStorage} from './localStorage';


const CartPage = observer(() => {
    const deviceType = useDeviceType();
    const {cartItems} = useCartStore();

    useEffect(() => {
        cartPageStorage.getCartItems();
    // TODO: Кирилл из будущего, сделай механизм получше
    }, [cartItems.length]);


    if (!cartItems.length) {
        return <EmptyCart />;
    }

    return (
        <Grid className={styles.cartPage}>
            {deviceType === 'mobile' && <PageHeading content={'Корзина'} />}
            <Row>
                <Col xs={12} md={9}>
                    <Row>
                        {cartItems.map(
                            ({productId}) => (
                                <Col key={productId} xs={12} md={4}>
                                    <ProductCartCard productId={productId} />
                                </Col>
                            ),
                        )}
                    </Row>
                </Col>
                <Col
                    xs={12}
                    md={3}
                    className={styles.sidePanel}
                >
                    <CartTotals />
                    <Checkout />
                </Col>
            </Row>
        </Grid>
    );
});

export default CartPage;
