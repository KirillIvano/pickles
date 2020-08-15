import React from 'react';
import classnames from 'classnames';

import {Button} from '@/uikit';

import styles from './styles.scss';
import cartImg from './images/cart.svg';


type CartButtonProps = {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    content: string;

    className?: string;
}

const CartButton = ({
    handleClick,
    content,

    className,
}: CartButtonProps) => (
    <Button
        className={classnames(className, styles.cartButton)}
        onClick={handleClick}
    >
        <img src={cartImg} />
        <span className={styles.buttonCaption}>{content}</span>
    </Button>
);

export default CartButton;
