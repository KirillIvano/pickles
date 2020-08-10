import React from 'react';

import {Reference, CartButton} from '@/components';

import styles from './styles.scss';


type ProductPreviewCardProps = {
    id: number;
    name: string;
    image: string;
    price: number;
    weight: number;
}

const ProductPreviewCard = ({
    id,
    name,
    image,
    price,
    weight,
}: ProductPreviewCardProps) => (
    <Reference
        to={`/product/${id}`}
        className={styles.productCard}
    >
        <div className={styles.productImageWrapper}>
            <img src={image} className={styles.productImage} alt="Фотография товара" />
        </div>
        <div className={styles.productInfo}>
            <p>
                <span className={styles.productPrice}>{price} ₽</span>
                <span className={styles.productWeight}> / {weight}кг</span>
            </p>

            <p className={styles.productName}>{name}</p>
        </div>

        <CartButton
            handleClick={e => {
                e.stopPropagation();
            }}
            content={'В корзину'}
            className={styles.cartButton}
        />
    </Reference>
);

export default ProductPreviewCard;
