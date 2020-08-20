import React, {useEffect} from 'react';
import {useForm, ValidationRules} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

import {Button} from '@/uikit';

import {CheckoutInput} from '..';
import styles from './styles.scss';
import {checkoutStore} from './localStore';


type CheckoutFields = {
    name: string;
    phone: string;
    email: string;
    address: string;
    comment: string;
}

const FORM_CONFIGS: Record<keyof CheckoutFields, ValidationRules> = {
    name: {required: {value: true, message: 'Имя обязательно'}},
    phone: {required: {value: true, message: 'Телефон обязателен'}},
    email: {required: {value: true, message: 'Почта обязательна'}},
    address: {},
    comment: {},
};

const Checkout = () => {
    const {
        register,
        errors,
        handleSubmit,
        reset: resetForm,
    } = useForm<CheckoutFields>();
    const history = useHistory();
    const {
        formSendingInProgress,
        formSendingError,
        formSendingSuccess,
        orderInfo,
    } = checkoutStore;

    useEffect(() => {
        if (formSendingSuccess) {
            resetForm();
            checkoutStore.finishOrderCreating();
            history.push(`/orderSuccess?key=${orderInfo.key}&orderId=${orderInfo.id}`);
        }
    }, [formSendingSuccess, history, resetForm, orderInfo]);

    return (
        <form
            noValidate
            onSubmit={handleSubmit(
                values => checkoutStore.sendCheckoutForm(values),
            )}
            className={styles.checkout}
        >
            <CheckoutInput
                ref={register(FORM_CONFIGS.name)}
                name="name"
                disabled={formSendingInProgress}
                caption={'Ваше имя'}
                placeholder={'Иван'}
                required={true}
                error={errors.name?.message}
            />
            <CheckoutInput
                ref={register(FORM_CONFIGS.phone)}
                name="phone"
                disabled={formSendingInProgress}
                caption={'Телефон'}
                placeholder={'8 999 999 99 99'}
                required={true}
                type="tel"
                error={errors.phone?.message}
            />
            <CheckoutInput
                ref={register(FORM_CONFIGS.email)}
                name="email"
                disabled={formSendingInProgress}
                caption={'Ваша почта'}
                placeholder={'example@mail.ru'}
                required={true}
                type="email"
                error={errors.email?.message}
            />
            <CheckoutInput
                ref={register(FORM_CONFIGS.address)}
                name="address"
                disabled={formSendingInProgress}
                caption={'Адрес доставки'}
                placeholder={'г. Москва ул.Примерная'}
                error={errors.address?.message}
            />
            <CheckoutInput
                ref={register(FORM_CONFIGS.comment)}
                name="comment"
                disabled={formSendingInProgress}
                caption={'Комментарий'}
                placeholder={'У меня две ножки а ещё есть рожки'}
                error={errors.comment?.message}
            />

            <Button
                className={styles.submitBtn}
                disabled={formSendingInProgress}
                type="submit"
            >
                Подтвердить
            </Button>

            <p className={styles.formError}>
                {formSendingError}
            </p>
        </form>
    );
};

export default Checkout;
