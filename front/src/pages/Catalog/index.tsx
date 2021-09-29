import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {Helmet} from 'react-helmet';

import {CartShortcut} from '@/parts';
import {useScrollTop} from '@/hooks/useScrollTop';
import {useUserStore} from '@/entities/user/hooks';
import {useCategoriesStore} from '@/entities/productCategory/hooks';
import {UserRetailType} from '@/entities/user/types';

import {DesktopCatalog, MobileCatalog} from './components';
import {withProductsFiltering} from './containers/withProductsFiltering';
import {useCategoryId} from './hooks/useCategoryId';
import {useCatalogRetailType} from './hooks/useCatalogRetailType';
import {CatalogStoreContext} from './contexts/CatalogStore';
import {CatalogStore} from './localStore';
import {useGroupId} from './hooks/useGroupId';

const defaultMetaDescription =
    'Аглобелл предлагает вкусные соленья, морепродукты, бочковые овощи оптом. ' +
    'В каталоге Вы можете выбрать помидоры, огурцы, капусту, имбирь, корейскую морковь. Доставка по Москве, России.';

const PageHead = observer(() => {
    const categoryId = useCategoryId();
    const categoryStore = useCategoriesStore();
    const retail = useCatalogRetailType();

    const category = categoryId !== null ? categoryStore.categoriesPreviews[categoryId] : null;

    const {descriptionMeta} = category || {};

    return (
        <Helmet>
            <title>
                {category?.name ?? 'Соленья'} {retail === UserRetailType.RETAIL ? 'в розницу' : 'оптом'}:{' '}
                цены, купить в Москве | Соленые овощи маринованные, бочковые
            </title>
            <meta key="description" name="description" content={descriptionMeta ?? defaultMetaDescription} />
        </Helmet>
    );
});

const Catalog = () => {
    useScrollTop();

    const queryCategoryId = useCategoryId();
    const queryGroupId = useGroupId();

    const retailType = useCatalogRetailType();

    const userStore = useUserStore();
    const catalogStore = useMemo(() => new CatalogStore(), []);
    const {categoryId, groupId} = catalogStore;

    useEffect(() => {
        retailType && userStore.setRetailType(retailType);
    }, [retailType, userStore]);

    useEffect(() => {
        catalogStore.setCategory(queryCategoryId || null);
        catalogStore.setGroup(queryGroupId || null);
    }, [catalogStore, queryCategoryId, queryGroupId]);

    useEffect(() => {
        catalogStore.getProducts(categoryId, retailType, groupId);
    }, [retailType, catalogStore, groupId, categoryId]);

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
