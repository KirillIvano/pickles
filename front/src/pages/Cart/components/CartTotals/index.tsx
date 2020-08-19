import React, { useMemo } from 'react';
import {observer} from 'mobx-react-lite';

import {useFormattedPrice} from '@/hooks/useFormattedPrice';
import {pluralize} from '@/util/pluralize';

import styles from './styles.scss';
import {useCartTotals} from '../../hooks/useCartTotals';


const PRODUCT_PLURAL_FORMS = ['товар', 'товара', 'товаров'];

const CartTotals = observer(() => {
    const {price, count} = useCartTotals();
    const formattedPrice = useFormattedPrice(price);

    const pluralizedProductString = useMemo(
        () => pluralize(count, PRODUCT_PLURAL_FORMS),
        [count],
    );

    return (
        <div className={styles.cartTotals}>
            <p className={styles.itemsCount}>
                {count} {pluralizedProductString}
            </p>
            <p className={styles.totalsItem}>
                <span className={styles.itemName}>{'сумма: '}</span>
                <span className={styles.itemValue}>{formattedPrice} ₽</span>
            </p>
        </div>
    );
});

export default CartTotals;
