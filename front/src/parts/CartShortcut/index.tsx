import React from 'react';
import {createPortal} from 'react-dom';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {useCartStore} from '@/entities/cart/hooks';
import {Reference} from '@/components';

import styles from './styles.scss';
import cartSrc from './images/cart.svg';


const CartShortcut = observer(() => {
    const {itemsCount} = useCartStore();

    return createPortal(
        <Reference
            to={'/cart'}
            className={classnames(
                styles.cartShortcut,
                {[styles.shortcutVisible]: itemsCount > 0},
            )}
        >
            <img
                src={cartSrc}
                alt={'Фото корзины'}
                className={styles.cartImage}
            />
            <p className={styles.cartShortcutCaption}>
                Корзина ({itemsCount})
            </p>
        </Reference>,
        document.body,
    );
});

export default CartShortcut;
