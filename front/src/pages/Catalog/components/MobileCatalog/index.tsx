import React from 'react';

import {renderForMobileHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import {
    ProductsList,
    MobileFilterPanel,
    CatalogFeaturing,
    CategoryDescription,
} from '..';
import CatalogRetailType from '../CatalogRetailType';
import styles from './styles.scss';
import CatalogUselessText from '../CatalogUselessText';

const MobileCatalog = () => (
    <>
        <Grid>
            <CatalogRetailType />
        </Grid>
        <MobileFilterPanel />
        <Grid>
            <CatalogFeaturing className={styles.featuring} />
            <ProductsList />
            <CategoryDescription />
            <CatalogUselessText />
        </Grid>
    </>
);

export default renderForMobileHOC(MobileCatalog);
