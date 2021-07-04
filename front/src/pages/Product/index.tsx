import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Helmet} from 'react-helmet';

import {Preloader} from '@/uikit';
import {useScrollTop} from '@/hooks/useScrollTop';
import {useProductById} from '@/entities/product/hooks';
import {UserRetailType} from '@/entities/user/types';
import {useGlobalRetailType} from '@/entities/user/hooks';

import {useProductPageStore} from './hooks/useProductPageStore';
import {useVariantId} from './hooks/useVariantId';
import {DesktopProductPageContent, MobileProductPageContent} from './components';

import styles from './styles.scss';


const capitalize = (str: string): string =>
    str[0].toUpperCase() + str.slice(1);

const PageHead = observer(({productId}: {productId: number}) => {
    const {name} = useProductById(productId);
    const retail = useGlobalRetailType();

    return (
        <Helmet>
            <title>
                {capitalize(name)} купить {retail === UserRetailType.RETAIL ? 'в розницу' : 'оптом'}{' '}
                в Москве, цена, состав - Aglobell
            </title>
        </Helmet>
    );
});


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
            <PageHead productId={currentProductId} />
            <MobileProductPageContent productId={currentProductId} />
            <DesktopProductPageContent productId={currentProductId} />
        </div>
    );
});

export default ProductPage;
