import React from 'react';
import classnames from 'classnames';

import {Input, Label} from '@/uikit';
import {getUniqueId} from '@/util/getUniqueId';

import styles from './styles.scss';


interface CheckoutInputProps {
    name: string;
    caption: string;
    placeholder: string;

    type?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutInput = React.forwardRef<any, CheckoutInputProps>(({
    caption,
    required,
    error,

    ...inputProps
}, ref) => {
    const id = getUniqueId();

    return (
        <div className={styles.checkoutInputWrapper}>
            <Label htmlFor={id} className={styles.label}>
                {caption}{required && <span className={styles.asteriks}>*</span>}
            </Label>

            <Input
                {...inputProps}
                id={id}
                sizing={'lg'}
                className={classnames(
                    styles.input,
                    {[styles.error]: !!error},
                )}
                ref={ref}
            />
            <p className={styles.errorView}>{error}</p>
        </div>
    );
});
CheckoutInput.displayName = 'CheckoutInput';

export default CheckoutInput;
