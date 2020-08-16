import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {NumberInput} from '@/uikit';
import {useCartItemById, useCartStore} from '@/entities/cart/hooks';

import styles from './styles.scss';

type ProductCountInputProps = {
    productId: number;
}

const ProductCountInput = observer(({productId}: ProductCountInputProps) => {
    const cartItem = useCartItemById(productId);
    const {updateProductCount} = useCartStore();

    const [localValue, setLocalValue] = useState('');

    if (!cartItem) return null;

    const {productsCount} = cartItem;

    useEffect(() => {
        if (+localValue !== productsCount) {
            setLocalValue(`${productsCount}`);
        }
    // это допустимо, так как я отлавливаю именно ВНЕШНИЕ изменения
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsCount]);

    const handleInc = () => {
        setLocalValue(val => `${+val + 1}`);
        updateProductCount(productId, +localValue + 1);
    };
    const handleDec = () => {
        if (+localValue <= 1) return;

        setLocalValue(`${+localValue - 1}`);
        updateProductCount(productId, +localValue - 1);
    };
    const handleChange = (val: string) => {
        const numericValue = +val;

        if (isNaN(numericValue)) return;

        numericValue >= 0 &&setLocalValue(val);
        numericValue >= 1 && updateProductCount(productId, numericValue);
    };

    return (
        <NumberInput
            value={localValue}
            handleDec={handleDec}
            handleInc={handleInc}
            handleChange={handleChange}

            aria-invalid={+localValue < 1}

            className={classnames({[styles.invalid]: +localValue < 1})}
        />
    );
});

export default ProductCountInput;
