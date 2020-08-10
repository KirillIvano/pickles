import React from 'react';

import {renderForMobileHOC} from '@/contexts/DeviceContext';

import {ProductsList, MobileFilterPanel} from '..';
import {Grid} from '@/uikit';


const MobileCatalog = () => (
    <>
        <MobileFilterPanel />
        <Grid>
            <ProductsList />
        </Grid>
    </>
);

export default renderForMobileHOC(MobileCatalog);
