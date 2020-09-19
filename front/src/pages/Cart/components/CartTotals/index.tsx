import React, { useMemo } from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {useFormattedPrice} from '@/hooks/useFormattedPrice';
import {pluralize} from '@/util/pluralize';

import styles from './styles.scss';
import {useCartPageStore} from '../../hooks/useCartPageStore';


const PRODUCT_PLURAL_FORMS = ['товар', 'товара', 'товаров'];

const CartTotals = observer(() => {
    const {
        cartTotalProductsPrice,
        cartTotalPrice,
        cartTotalCount,
        deliveryPrice,
    } = useCartPageStore();

    const formattedProductsPrice = useFormattedPrice(cartTotalProductsPrice);
    const formattedTotalPrice = useFormattedPrice(cartTotalPrice);

    const pluralizedProductString = useMemo(
        () => pluralize(cartTotalCount, PRODUCT_PLURAL_FORMS),
        [cartTotalCount],
    );

    return (
        <div className={styles.cartTotals}>
            <p className={styles.itemsCount}>
                {cartTotalCount} {pluralizedProductString}
            </p>

            <p className={styles.totalsItem}>
                <span className={styles.itemName}>{'Товаров на: '}</span>
                <span className={styles.itemValue}>{formattedProductsPrice} ₽</span>
            </p>

            <p className={styles.totalsItem}>
                <span className={styles.itemName}>{'Доставка: '}</span>
                <span className={styles.itemValue}>{deliveryPrice} ₽</span>
            </p>

            <p className={styles.totalsItem}>
                <span className={styles.itemName}>{'Итог: '}</span>
                <span className={classnames(
                    styles.itemValue,
                    styles.totalPrice,
                )}>
                    {formattedTotalPrice} ₽
                </span>
            </p>
        </div>
    );
});

export default CartTotals;
