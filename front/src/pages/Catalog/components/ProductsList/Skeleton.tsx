import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {ProductPreviewCard} from '@/components';

import styles from './styles.scss';


const ProductsListSkeleton = () => (
    <Row className={styles.productList}>
        {Array.from({length: 4}).map((_, i) => (
            <Col key={i} xs={6} md={4} className={styles.productListItem}>
                <ProductPreviewCard.Skeleton />
            </Col>
        ))}
    </Row>
);

export default ProductsListSkeleton;
