import React from 'react';

import {ButtonLink, Grid} from '@/uikit';

import styles from './styles.scss';
import successImg from './images/success.svg';
import { useQuery } from '@/hooks/useQuery';


const OrderSuccess = () => {
    const {key, orderId} = useQuery<{key: string; orderId: string}>();

    return (
        <Grid className={styles.orderSuccessPage}>
            <div className={styles.heading}>
                <img
                    className={styles.headingImage}
                    src={successImg}
                    alt="Успешно завершено"
                />
                <h1 className={styles.headingContent}>Заказ отправлен администратору</h1>
            </div>
            <div className={styles.pageInfo}>
                <p className={styles.serviceInfo}>{
                    'На вашу почту отправлено письмо с подтверждением заказа.' +
                    ' Если письмо не пришло, пожалуйста, отправьте запрос в поддержку'
                }</p>

                <div className={styles.links}>
                    <ButtonLink className={styles.orderLink} to={`/order/${orderId}?key=${key}`}>К заказу</ButtonLink>
                    <ButtonLink className={styles.catalogLink} to="/catalog">Вернуться в каталог</ButtonLink>
                </div>
            </div>
        </Grid>
    );
};

export default OrderSuccess;
