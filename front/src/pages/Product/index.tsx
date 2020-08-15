import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Row, Col} from 'react-flexbox-grid';

import {Grid, Preloader} from '@/uikit';
import {useProductById} from '@/entities/product/hooks';

import {useProductPageStore} from './hooks/useProductPageStore';
import {useProductId} from './hooks/useProductId';
import {DesktopProductPageContent, MobileProductPageContent} from './components';

import styles from './styles.scss';


const ProductPage = observer(() => {
    const {
        productGettingInProgress,
        productGettingError,
        getProduct,
    } = useProductPageStore();
    const productId = useProductId();
    const product = useProductById(productId);

    useEffect(() => {
        getProduct(productId);
    }, [productId, getProduct]);

    if (productGettingError) return <div>Отшиб очка</div>;
    if (productGettingInProgress || !product) return <Preloader />;

    return (
        <div className={styles.productPage}>
            <MobileProductPageContent productId={productId} />
            <DesktopProductPageContent productId={productId} />
        </div>
    );
});

export default ProductPage;
