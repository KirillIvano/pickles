import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import {
    DesktopSidePanel,
    ProductsList,
    CatalogRetailType,
    CatalogFeaturing,
    CatalogDescription,
} from './../';
import styles from './styles.scss';


const DesktopCatalog = () =>  (
    <Grid>
        <Row>
            <Col xs={4}>
                <DesktopSidePanel />
            </Col>

            <Col xs={8}>
                <CatalogRetailType />
                <CatalogFeaturing className={styles.featuringSection} />
                <ProductsList />
                <CatalogDescription />
            </Col>
        </Row>
    </Grid>
);

export default renderForDesktopHOC(DesktopCatalog);
