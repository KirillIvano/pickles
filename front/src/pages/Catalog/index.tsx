import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {Helmet} from 'react-helmet';

import {CartShortcut} from '@/parts';
import {useScrollTop} from '@/hooks/useScrollTop';
import {useUserStore} from '@/entities/user/hooks';

import {DesktopCatalog, MobileCatalog} from './components';
import {withProductsFiltering} from './containers/withProductsFiltering';
import {useCategoryId} from './hooks/useCategoryId';
import {useCatalogRetailType} from './hooks/useCatalogRetailType';
import {CatalogStoreContext} from './contexts/CatalogStore';
import {CatalogStore} from './localStore';
import {useCategoryById} from '@/entities/productCategory/hooks';


const PageHead = observer(() => {
    const categoryId = useCategoryId();
    const category = useCategoryById(categoryId);

    if (!category) return null;

    const {name, description} = category;

    return (
        <Helmet>
            <title>Каталог - {name}</title>
            {description && <meta key="description" name="description" content={description} />}
        </Helmet>
    );
});

const Catalog = () => {
    useScrollTop();

    const categoryId = useCategoryId();
    const retailType = useCatalogRetailType();

    const userStore = useUserStore();
    const catalogStore = useMemo(() => new CatalogStore(), []);

    useEffect(() => {
        retailType && userStore.setRetailType(retailType);
    }, [retailType, userStore]);

    useEffect(() => {
        catalogStore.getProducts(categoryId, retailType);
    }, [categoryId, retailType, catalogStore]);

    return (
        <>
            <PageHead />

            <CatalogStoreContext.Provider value={catalogStore}>
                <CartShortcut />

                <DesktopCatalog />
                <MobileCatalog />
            </CatalogStoreContext.Provider>
        </>
    );
};

export default withProductsFiltering(
    observer(Catalog),
);
