import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type BurgerProps = {
    isActive: boolean;
    handleClick: () => void;
}

const Burger = ({
    isActive,
    handleClick,
}: BurgerProps) => (
    <button
        onClick={handleClick}
        className={styles.burgerContainer}
    >
        <div
            className={classnames(
                styles.burger,
                {[styles.active]: isActive},
            )}
        />
    </button>
);

export default Burger;
