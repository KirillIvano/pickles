import React from 'react';

import {renderForMobileHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import {ProductsList, MobileFilterPanel, CatalogFeaturing} from '..';
import CatalogRetailType from '../CatalogRetailType';
import styles from './styles.scss';

const MobileCatalog = () => (
    <>
        <Grid>
            <CatalogRetailType />
        </Grid>
        <MobileFilterPanel />
        <Grid>
            <CatalogFeaturing className={styles.featuring} />
            <ProductsList />
        </Grid>
    </>
);

export default renderForMobileHOC(MobileCatalog);
