import React, {useEffect, useMemo} from 'react';
import {Col, Row} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {Grid, Preloader} from '@/uikit';
import {ProductCartCard} from '@/components';
import {useCartStore} from '@/entities/cart/hooks';
import {useScrollTop} from '@/hooks/useScrollTop';
import {useUserStore} from '@/entities/user/hooks';

import {
    Checkout,
    EmptyCart,
    CartTotals,
    CartDelivery,
    CartWarnings,
    CartHeading,
} from './components';
import {CartPageStorage} from './localStorage';
import styles from './styles.scss';
import {CartPageStoreContext, useCartPageStore} from './hooks/useCartPageStore';
import {useCartRetailType} from './hooks/useCartRetailType';


const CartContent = observer(() => {
    const retailType = useCartRetailType();
    const {cartItems} = useCartStore(retailType);
    const {cartGettingCompleted} = useCartPageStore();

    return (
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
    );
});

const CartPage = observer(() => {
    useScrollTop();

    const retailType = useCartRetailType();
    const cartPageStorage = useMemo(() => new CartPageStorage(retailType), [retailType]);
    const userStore = useUserStore();
    const {itemsCount} = useCartStore(retailType);

    useEffect(() => {
        userStore.setRetailType(retailType);
    }, [retailType, userStore]);

    useEffect(() => {
        cartPageStorage.getCartItems();
    }, [cartPageStorage]);

    return (
        <CartPageStoreContext.Provider value={cartPageStorage}>
            <Grid className={styles.cartPage}>
                <CartHeading />
                {itemsCount ? <CartContent /> : <EmptyCart />}
            </Grid>
        </CartPageStoreContext.Provider>
    );
});

export default CartPage;
