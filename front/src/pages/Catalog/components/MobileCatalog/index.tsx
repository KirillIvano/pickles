import React from 'react';

import {renderForMobileHOC} from '@/contexts/DeviceContext';
import {Grid, PageHeading} from '@/uikit';

import {ProductsList, MobileFilterPanel} from '..';


const MobileCatalog = () => (
    <>
        <Grid>
            <PageHeading content={'Каталог'} />
        </Grid>
        <MobileFilterPanel />
        <Grid>
            <ProductsList />
        </Grid>
    </>
);

export default renderForMobileHOC(MobileCatalog);
