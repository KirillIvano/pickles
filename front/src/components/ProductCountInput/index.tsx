import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {NumberInput} from '@/uikit';
import {useCartItemById, useCartStore} from '@/entities/cart/hooks';

import styles from './styles.scss';

type ProductCountInputProps = {
    productId: number;
    className?: string;
    wrapperClass?: string;
}

const ProductCountInput = observer(({
    productId,
    className,
    wrapperClass,
}: ProductCountInputProps) => {
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

        if (numericValue === 0) {
            setLocalValue(val === '' ? '' : '1');
            updateProductCount(productId, 1);
        } else if (numericValue > 0) {
            setLocalValue(val);
            updateProductCount(productId, numericValue);
        }
    };

    const handleBlur = () => {
        if (localValue) return;

        setLocalValue('1');
    };

    return (
        <NumberInput
            value={localValue}
            handleDec={handleDec}
            handleInc={handleInc}
            handleChange={handleChange}

            onBlur={handleBlur}

            aria-invalid={+localValue < 1}

            wrapperClass={wrapperClass}
            className={classnames(
                className,
                {[styles.invalid]: +localValue < 1},
            )}
        />
    );
});

export default ProductCountInput;
