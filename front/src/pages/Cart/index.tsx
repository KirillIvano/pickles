import React, { useEffect } from 'react';
import {Col, Row} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {useDeviceType} from '@/contexts/DeviceContext';
import {Grid, PageHeading, Preloader} from '@/uikit';
import {ProductCartCard} from '@/components';
import {useCartStore} from '@/entities/cart/hooks';
import {useScrollTop} from '@/hooks/useScrollTop';

import {
    Checkout,
    EmptyCart,
    CartTotals,
    CartDelivery,
    CartWarnings,
} from './components';
import {cartPageStorage} from './localStorage';
import styles from './styles.scss';


const CartPage = observer(() => {
    useScrollTop();

    const deviceType = useDeviceType();
    const {itemsCount, cartItems} = useCartStore();
    const {cartGettingCompleted} = cartPageStorage;

    useEffect(() => {
        cartPageStorage.getCartItems();
    }, []);

    if (!itemsCount) {
        return <EmptyCart />;
    }

    return (
        <Grid className={styles.cartPage}>
            {deviceType === 'mobile' && <PageHeading content={'Корзина'} />}

            <Row>
                <Col xs={12} md={9}>
                    <CartWarnings />
                    {cartGettingCompleted
                        ? (
                            <Row className={styles.cartItems}>
                                {cartItems.map(
                                    ({productId}) => (
                                        <Col
                                            className={styles.cartItemContainer}
                                            key={productId}
                                            xs={12}
                                            md={4}
                                        >
                                            <ProductCartCard
                                                productId={productId}
                                            />
                                        </Col>
                                    ),
                                )}
                            </Row>
                        ) : <Preloader />
                    }
                </Col>
                <Col
                    xs={12}
                    md={3}
                    className={styles.sidePanel}
                >
                    <CartTotals />
                    <CartDelivery />
                    <Checkout className={styles.checkout} />
                </Col>
            </Row>
        </Grid>
    );
});

export default CartPage;
