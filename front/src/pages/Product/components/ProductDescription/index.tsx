import React from 'react';
import {observer} from 'mobx-react-lite';

import {InfoTable} from '@/uikit';
import {useProductById} from '@/entities/product/hooks';

import styles from './styles.scss';
import {ProductVersions} from '..';


type ProductDescriptionProps = {
    productId: number;
}

const ProductDescription = observer(({
    productId,
}: ProductDescriptionProps) => {
    const {
        info,
        name,
    } = useProductById(productId);

    return (
        <div className={styles.productDescription}>
            <h1 className={styles.productName}>{name}</h1>

            <ProductVersions
                productId={productId}
                className={styles.productVariants}
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
