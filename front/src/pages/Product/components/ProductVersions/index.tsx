import React from 'react';
import {observer} from 'mobx-react-lite';

import {CartButton} from '@/components';
import {useProductById} from '@/entities/product/hooks';

import styles from './styles.scss';


type ProductVersionProps = {
    id: number;
    weight: string;
    price: number;
}

const ProductVersion = ({
    id,
    weight,
    price,
}: ProductVersionProps) => {
    return (
        <div className={styles.productVariant}>
            <p className={styles.productVariantInfo}>
                <span className={styles.productVariantPrice}>
                    {price}₽
                </span> за {weight}
            </p>

            <div className={styles.cartButtonWrapper}>
                <CartButton
                    productId={id}
                />
            </div>
        </div>
    );
};


type ProductVersionsProps = {
    productId: number;

    className?: string;
}

const ProductVersions = observer(({
    productId,
    className,
}: ProductVersionsProps) => {
    const {productWeights} = useProductById(productId);

    return (
        <div className={className}>
            {productWeights.map(variant =>
                <ProductVersion {...variant} key={variant.id} />,
            )}
        </div>
    );
});

export default ProductVersions;
