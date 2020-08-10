import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {ProductPreviewType} from '@/entities/product/types';
import {ProductPreviewCard} from '@/components';

import styles from './styles.scss';
import {useDigestedProducts} from '../../hooks/useDigestedProducts';
import { useCatalogStoreContext } from '../../hooks/useCatalogStoreContext';
import { Preloader } from '@/uikit';


type ProductListItemProps = ProductPreviewType

const ProductListItem = (product: ProductListItemProps) => (
    <Col xs={6} md={4} className={styles.productListItem}>
        <ProductPreviewCard {...product} />
    </Col>
);


const ProductsList = observer(() => {
    const {productsLoadingInProgress} = useCatalogStoreContext();
    const products = useDigestedProducts();

    if (productsLoadingInProgress) {
        return <Preloader />;
    }

    if (products.length === 0) {
        return (
            <p>Ничего не найдено, попробуйте пошаманить с фильтрами:)</p>
        );
    }

    return (
        <Row className={styles.productList}>
            {products.map(
                product => (
                    <ProductListItem
                        key={product.id}
                        {...product}
                    />
                ),
            )}
        </Row>
    );
});

export default ProductsList;
