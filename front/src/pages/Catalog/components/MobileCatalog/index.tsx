import React from 'react';

import {renderForMobileHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import {ProductsList, MobileFilterPanel} from '..';
import CatalogRetailType from '../CatalogRetailType';


const MobileCatalog = () => (
    <>
        <Grid>
            <CatalogRetailType />
        </Grid>
        <MobileFilterPanel />
        <Grid>
            <ProductsList />
        </Grid>
    </>
);

export default renderForMobileHOC(MobileCatalog);
