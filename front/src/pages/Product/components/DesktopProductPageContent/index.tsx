import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {Grid} from '@/uikit';
import {renderForDesktopHOC} from '@/contexts/DeviceContext';

import {
    DesktopProductGallery,
    ProductDescription,
    ProductBreadCrumps,
} from '..';


type DesktopProductPageContentProps = {
    productId: number;
}

const DesktopProductPageContent = ({
    productId,
}: DesktopProductPageContentProps) => (
    <Grid>
        <ProductBreadCrumps
            productId={productId}
        />
        <Row>
            <Col xs={12} md={7}>
                <DesktopProductGallery productId={productId} />
            </Col>
            <Col xs={12} md={5}>
                <ProductDescription productId={productId} />
            </Col>
        </Row>
    </Grid>
);


export default renderForDesktopHOC(DesktopProductPageContent);
