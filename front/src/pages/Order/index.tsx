import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Col, Row} from 'react-flexbox-grid';

import {useQuery} from '@/hooks/useQuery';
import {Preloader, Grid} from '@/uikit';
import {useOrderById} from '@/entities/order/hooks';

import {orderPageStore} from './localStore';
import {
    OrderClientCard,
    OrderItemsCard,
    OrderGeneralInfo,
} from './components';
import styles from './styles.scss';
import {useOrderPageStore} from './hooks/useOrderPageStore';


const OrderPage = observer(() => {
    const {key: orderKey} = useQuery<{key: string}>();
    const orderId = +useParams<{orderId: string}>().orderId;

    const {orderLoadingError, orderLoadingSuccess} = useOrderPageStore();
    const order = useOrderById(orderId);

    useEffect(() => {
        orderPageStore.getOrder(orderId, orderKey);
    }, [orderKey, orderId]);


    if (orderLoadingError) return <div>Произошла ошибка загрузки</div>;
    if (!orderLoadingSuccess || !order) return <Preloader />;

    return (
        <Grid className={styles.orderPage}>
            <Row>
                <Col xs={12} md={4}>
                    <OrderGeneralInfo orderId={orderId} />
                </Col>
                <Col xs={12} md={4}>
                    <OrderItemsCard orderId={orderId} />
                </Col>
                <Col xs={12} md={4}>
                    <OrderClientCard orderId={orderId} />
                </Col>
            </Row>

            <div className={styles.phoneReminderWrapper}>
                <p className={styles.phoneReminder}>
                    <span className={styles.reminderCaption}>Телефон поддержки</span>
                    <span className={styles.phoneNumber}>8(925)640-88-25</span>
                </p>
            </div>
        </Grid>
    );
});

export default OrderPage;
