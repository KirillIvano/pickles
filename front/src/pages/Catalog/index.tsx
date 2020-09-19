import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {useQuery} from '@/hooks/useQuery';
import {CartShortcut} from '@/parts';
import {useScrollTop} from '@/hooks/useScrollTop';

import {DesktopCatalog, MobileCatalog} from './components';
import {withProductsFiltering} from './containers/withProductsFiltering';
import {useCatalogStoreContext} from './hooks/useCatalogStoreContext';


const Catalog = () => {
    useScrollTop();

    const {getProducts} = useCatalogStoreContext();
    const {categoryId} = useQuery<{categoryId: string}>();

    useEffect(() => {
        getProducts(+categoryId);
    }, [categoryId, getProducts]);

    return (
        <>
            <CartShortcut />
            <DesktopCatalog />
            <MobileCatalog />
        </>
    );
};

export default withProductsFiltering(
    observer(Catalog),
);
