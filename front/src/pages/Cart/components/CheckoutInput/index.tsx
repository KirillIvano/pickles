import React from 'react';
import classnames from 'classnames';

import {Input, Label} from '@/uikit';
import {getUniqueId} from '@/util/getUniqueId';

import styles from './styles.scss';

interface CheckoutInputProps extends React.ComponentProps<typeof Input> {
    caption: string;
    required?: boolean;
    error?: string;
}

const CheckoutInput = React.forwardRef<HTMLInputElement, CheckoutInputProps>(({
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
