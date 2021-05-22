import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {ProductPreviewType} from '@/entities/product/types';
import {ProductPreviewCard} from '@/components';
import {Button} from '@/uikit';

import styles from './styles.scss';
import {useDigestedProducts} from '../../hooks/useDigestedProducts';
import {useCatalogStoreContext} from '../../hooks/useCatalogStoreContext';
import {useShownProductsCount} from './hooks/useShownProductsCount';
import ProductsListSkeleton from './Skeleton';


type ProductListItemProps = ProductPreviewType;

const ProductListItem = (props: ProductListItemProps) => (
    <Col xs={6} md={4} className={styles.productListItem}>
        <ProductPreviewCard {...props} />
    </Col>
);

const ProductsList = observer(() => {
    const {productsLoadingInProgress} = useCatalogStoreContext();
    const products = useDigestedProducts();

    const productsCount = products.length;

    const {showMore, shownCount} = useShownProductsCount();

    if (productsLoadingInProgress) {
        return <ProductsListSkeleton />;
    }

    if (products.length === 0) {
        return (
            <p>Ничего не найдено, попробуйте поменять фильтры</p>
        );
    }

    return (
        <Row className={styles.productList}>
            {products.slice(0, shownCount).map(
                (product, ind) => (
                    <ProductListItem
                        key={ind}
                        {...product}
                    />
                ),
            )}

            {shownCount < productsCount && (
                <Col mdOffset={3} md={6}>
                    <Button
                        className={styles.showMoreBtn}
                        onClick={showMore}
                    >
                        {'Показать ещё'}
                    </Button>
                </Col>
            )}
        </Row>
    );
});

export default ProductsList;
