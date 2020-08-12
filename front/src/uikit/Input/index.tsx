import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    sizing: 'sm' | 'lg';
}

export const Input = ({
    className,
    sizing,
    ...props
}: InputProps) => (
    <input
        {...props}
        className={classnames(
            className,
            styles.input,
            {[styles.large]: sizing === 'lg'},
        )}
    />
);


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
            {[styles.large]: sizing === 'lg'},
        )}
    />
);
