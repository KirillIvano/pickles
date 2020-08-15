import React from 'react';
import {observer} from 'mobx-react-lite';

import {InfoTable} from '@/uikit';
import {CartButton} from '@/components';
import {useProductById} from '@/entities/product/hooks';

import styles from './styles.scss';


type ProductDescriptionProps = {
    productId: number;
}

const ProductDescription = observer(({
    productId,
}: ProductDescriptionProps) => {
    const {
        price,
        weight,
        info,
        name,
    } = useProductById(productId);

    return (
        <div className={styles.productDescription}>
            <h2 className={styles.productName}>{name}</h2>
            <p className={styles.productPricing}>
                <span className={styles.price}>{price}₽</span>
                <span className={styles.volume}> за {weight}</span>
            </p>

            <CartButton
                className={styles.productToCart}
                content={'В корзину'}
            />
            <InfoTable
                className={styles.productInfo}
            >
                {info.map(
                    ({name, value}) => (
                        <InfoTable.InfoTableItem
                            key={name}
                            itemName={name}
                            itemValue={value}
                        />
                    ),
                )}
            </InfoTable>
        </div>
    );
});

export default ProductDescription;
