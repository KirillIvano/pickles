import React from 'react';
import {useForm} from 'react-hook-form';
import {Col} from 'react-flexbox-grid';

import {Button} from '@/uikit';

import {CheckoutInput} from '..';
import styles from './styles.scss';


const Checkout = () => {
    const {register} = useForm();

    return (
        <div className={styles.checkout}>
            <CheckoutInput
                ref={register}
                name="name"
                caption={'Ваше имя'}
                placeholder={'Иван'}
            />
            <CheckoutInput
                ref={register}
                name="phone"
                caption={'Телефон'}
                placeholder={'8 999 999 99 99'}
            />
            <CheckoutInput
                ref={register}
                name="email"
                caption={'Ваша почта'}
                placeholder={'example@mail.ru'}
            />
            <CheckoutInput
                ref={register}
                name="address"
                caption={'Адрес доставки'}
                placeholder={'г. Москва ул.Примерная'}
            />

            <Button
                className={styles.submitBtn}
                type="submit"
            >
                Подтвердить
            </Button>
        </div>
    );
};

export default Checkout;
