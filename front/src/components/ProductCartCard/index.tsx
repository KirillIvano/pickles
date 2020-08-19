import React from 'react';
import {observer} from 'mobx-react-lite';

import {useCartItemById, useCartStore} from '@/entities/cart/hooks';
import {useProductPreviewById} from '@/entities/product/hooks';
import {useFormattedPrice} from '@/hooks/useFormattedPrice';

import styles from './styles.scss';
import ProductCountInput from '../ProductCountInput';
import ProductImage from '../ProductImage';
import trashCanImage from './images/can.svg';

type ProductCartCardProps = {
    productId: number;
}

const ProductCartCard = observer(({productId}: ProductCartCardProps) => {
    const product = useProductPreviewById(productId);
    const cartItem = useCartItemById(productId);
    const {removeCartItem} = useCartStore();

    const formattedPrice = useFormattedPrice(
        product ? product.price : 0,
    );
    const formattedTotal = useFormattedPrice(
        cartItem && product ? cartItem.productsCount * product.price : 0,
    );

    if (!product || !cartItem) return null;

    const {name, weight, image} = product;

    return (
        <div className={styles.cartCard}>
            <ProductImage.Wrapper>
                <ProductImage src={image} />
            </ProductImage.Wrapper>

            <button
                className={styles.removeIcon}
                onClick={e => {
                    e.preventDefault();
                    removeCartItem(productId);
                }}
            >
                <img
                    className={styles.removeIconImage}
                    src={trashCanImage}
                    alt="Убрать продукт из корзины"
                />
            </button>

            <div className={styles.cardInfo}>
                <div className={styles.pricing}>
                    <span className={styles.price}>{formattedPrice} ₽</span>
                    <span className={styles.weight}>/{weight}</span>
                </div>

                <p className={styles.name}>{name}</p>

                <ProductCountInput
                    productId={productId}
                    wrapperClass={styles.countInput}
                />

                <p className={styles.totalPrice}>{formattedTotal} ₽</p>
            </div>
        </div>
    );
});

export default ProductCartCard;
