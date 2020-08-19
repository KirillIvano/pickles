import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    sizing?: 'sm' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    className,
    sizing='sm',
    ...props
}: InputProps, ref) => (
    <input
        {...props}
        ref={ref}
        className={classnames(
            className,
            styles.input,
            {[styles.large]: sizing === 'lg'},
        )}
    />
));
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    sizing: 'sm' | 'lg';
}

export const Select = ({
    className,
    sizing,
    ...props
}: SelectProps) => (
    <select
        {...props}
        className={classnames(
            className,
            styles.input,
            styles.select,
            {[styles.large]: sizing === 'lg'},
        )}
    />
);
