import React from 'react';

import {Reference, CartButton} from '@/components';

import styles from './styles.scss';
import ProductImage from '../ProductImage';


type ProductPreviewCardProps = {
    id: number;
    name: string;
    image: string;
    price: number;
    weight: number;
    verboseName: string;
}

const ProductPreviewCard = ({
    id,
    name,
    image,
    price,
    weight,
    verboseName,
}: ProductPreviewCardProps) => (
    <Reference
        to={`/product/${verboseName}/${id}`}
        className={styles.productCard}
    >
        <ProductImage.Wrapper className={styles.productImageWrapper}>
            <ProductImage className={styles.productImage} src={image} />
        </ProductImage.Wrapper>

        <div className={styles.productInfo}>
            <p>
                <span className={styles.productPrice}>{price} ₽</span>
                <span className={styles.productWeight}> / {weight}</span>
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
