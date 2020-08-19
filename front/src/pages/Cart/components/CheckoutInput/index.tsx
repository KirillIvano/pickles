import React from 'react';

import {Input, Label} from '@/uikit';
import styles from './styles.scss';
import { getUniqueId } from '@/util/getUniqueId';

interface CheckoutInputProps extends React.ComponentProps<typeof Input> {
    caption: string;
}

const CheckoutInput = React.forwardRef<HTMLInputElement, CheckoutInputProps>(({
    caption,

    ...inputProps
}, ref) => {
    const id = getUniqueId();

    return (
        <div className={styles.checkoutInputWrapper}>
            <Label htmlFor={id} className={styles.label}>
                {caption}
            </Label>

            <Input
                {...inputProps}
                id={id}
                sizing={'lg'}
                ref={ref}
            />
        </div>
    );
});
CheckoutInput.displayName = 'CheckoutInput';

export default CheckoutInput;
