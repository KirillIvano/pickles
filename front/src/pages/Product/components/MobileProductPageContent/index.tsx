import React from 'react';

import {Grid} from '@/uikit';
import {renderForMobileHOC} from '@/contexts/DeviceContext';

import {
    MobileProductGallery,
    ProductDescription,
    ProductBreadCrumps,
} from '..';


type MobileProductPageContentProps = {
    productId: number;
}

const MobileProductPageContent = ({
    productId,
}: MobileProductPageContentProps) => (
    <>
        <Grid>
            <ProductBreadCrumps
                productId={productId}
            />
        </Grid>

        <MobileProductGallery productId={productId} />

        <Grid>
            <ProductDescription productId={productId} />
        </Grid>
    </>
);


export default renderForMobileHOC(MobileProductPageContent);
