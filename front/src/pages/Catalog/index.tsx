import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {useQuery} from '@/hooks/useQuery';

import {DesktopCatalog, MobileCatalog} from './components';
import {withProductsFiltering} from './containers/withProductsFiltering';
import {useCatalogStoreContext} from './hooks/useCatalogStoreContext';


const Catalog = () => {
    const {getProducts} = useCatalogStoreContext();
    const {categoryId} = useQuery<{categoryId: string}>();

    useEffect(() => {
        getProducts(+categoryId);
    }, [categoryId]);

    return (
        <>
            <DesktopCatalog />
            <MobileCatalog />
        </>
    );
};

export default withProductsFiltering(
    observer(Catalog),
);
