import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({
    className,
    children,

    ...props
}: CheckboxProps) => {
    return (
        <label className={classnames(styles.checkboxWrapper, className)}>
            <input {...props} type="checkbox" /> <span className={styles.checkboxLabel}>{children}</span>
        </label>
    );
};

export default Checkbox;
