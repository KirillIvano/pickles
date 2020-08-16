import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleChange: (val: string) => void;
    handleDec: () => void;
    handleInc: () => void;

    value: string;

    wrapperClass?: string;
    className?: string;
}

const NumberInput = ({
    handleChange,
    handleDec,
    handleInc,

    value,

    className,
    wrapperClass,

    ...inputAttrs
}: NumberInputProps) => (
    <div className={classnames(wrapperClass, styles.numberInputWrapper)}>
        <button
            className={styles.leftControl}
            onClick={handleDec}
        >
            {'-'}
        </button>

        <input
            {...inputAttrs}
            value={value}
            type="number"
            onChange={({target: {value}}) => handleChange(value)}
            className={classnames(className, styles.numberInput)}
        />

        <button
            className={styles.rightControl}
            onClick={handleInc}
        >
            {'+'}
        </button>
    </div>
);

export default React.memo(NumberInput);
