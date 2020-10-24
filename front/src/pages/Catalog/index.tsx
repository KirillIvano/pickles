import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';

import {CartShortcut} from '@/parts';
import {useScrollTop} from '@/hooks/useScrollTop';
import {useUserStore} from '@/entities/user/hooks';

import {DesktopCatalog, MobileCatalog} from './components';
import {withProductsFiltering} from './containers/withProductsFiltering';
import {useCategoryId} from './hooks/useCategoryId';
import {useCatalogRetailType} from './hooks/useCatalogRetailType';
import {CatalogStoreContext} from './contexts/CatalogStore';
import {CatalogStore} from './localStore';


const Catalog = () => {
    useScrollTop();

    const categoryId = useCategoryId();
    const retailType = useCatalogRetailType();

    const userStore = useUserStore();
    const productsStore = useMemo(() => new CatalogStore(), []);

    useEffect(() => {
        retailType && userStore.setRetailType(retailType);
    }, [retailType, userStore]);

    useEffect(() => {
        productsStore.getProducts(categoryId, retailType);
    }, [categoryId, retailType, productsStore]);

    return (
        <CatalogStoreContext.Provider value={productsStore}>
            <CartShortcut />

            <DesktopCatalog />
            <MobileCatalog />
        </CatalogStoreContext.Provider>
    );
};

export default withProductsFiltering(
    observer(Catalog),
);
