import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import {DesktopSidePanel, ProductsList, CatalogRetailType} from './../';


const DesktopCatalog = () =>  (
    <Grid>
        <Row>
            <Col xs={4}>
                <DesktopSidePanel />
            </Col>

            <Col xs={8}>
                <CatalogRetailType />
                <ProductsList />
            </Col>
        </Row>
    </Grid>
);

export default renderForDesktopHOC(DesktopCatalog);
