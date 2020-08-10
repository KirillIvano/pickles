import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    className,
    ...props
}: ButtonProps) => (
    <button
        {...props}
        className={classnames(className, styles.button)}
    />
);

export default Button;
