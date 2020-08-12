import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import styles from './styles.scss';
import {DesktopSidePanel, ProductsList} from './../';


const DesktopCatalog = () =>  (
    <Grid>
        <Row>
            <Col xs={4}>
                <DesktopSidePanel />
            </Col>

            <Col xs={8}>
                <ProductsList />
            </Col>
        </Row>
    </Grid>
);

export default renderForDesktopHOC(DesktopCatalog);
