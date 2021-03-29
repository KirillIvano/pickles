import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {Preloader} from '@/uikit';
import {useScrollTop} from '@/hooks/useScrollTop';

import {useProductPageStore} from './hooks/useProductPageStore';
import {useVariantId} from './hooks/useVariantId';
import {DesktopProductPageContent, MobileProductPageContent} from './components';

import styles from './styles.scss';


const ProductPage = observer(() => {
    useScrollTop();

    const {
        productGettingInProgress,
        productGettingError,
        getProduct,
        currentProductId,
    } = useProductPageStore();
    const variantId = useVariantId();

    useEffect(() => {
        getProduct(variantId);
    }, [variantId, getProduct]);

    if (productGettingError) return <div>Произошла ошибка</div>;
    if (productGettingInProgress || !currentProductId) return <Preloader />;

    return (
        <div className={styles.productPage}>
            <MobileProductPageContent productId={currentProductId} />
            <DesktopProductPageContent productId={currentProductId} />
        </div>
    );
});

export default ProductPage;
