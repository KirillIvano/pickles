import React from 'react';
import classnames from 'classnames';
import {observer} from 'mobx-react-lite';

import {Button} from '@/uikit';
import {useCartStore} from '@/entities/cart/hooks';
import {useCartModalContext} from '@/hooks/useCartModalContext';

import styles from './styles.scss';
import cartImg from './images/cart.svg';


type CartButtonProps = {
    productId: number;

    className?: string;
}

const CartButton = observer(({
    productId,

    className,
}: CartButtonProps) => {
    const cartStore = useCartStore();
    const cartModalContext = useCartModalContext();

    const productFromCart = cartStore.getCartItemById(productId);
    const isProductInCart = productFromCart ? true : false;

    const handleCartAdd = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        cartModalContext.openModal(productId);
        cartStore.addProductToCart(productId);
    };

    return (
        <Button
            onClick={handleCartAdd}
            onKeyUp={e => e.key === 'Enter' && handleCartAdd(e)}
            disabled={isProductInCart}
            className={classnames(
                className,
                styles.cartButton,
                {[styles.selected]: isProductInCart},
            )}
        >
            {!isProductInCart && (
                <img
                    className={styles.cartIcon}
                    src={cartImg}
                    aria-hidden="true"
                    alt="Иконка корзины"
                />
            )}

            <span className={styles.buttonContent}>
                {isProductInCart ? 'В корзине' : 'В корзину'}
            </span>
        </Button>
    );
});

export default CartButton;
