import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {Grid} from '@/uikit';

import {Contacts, FooterLinks} from './components';
import styles from './styles.scss';

const Footer = () => (
    <footer className={styles.footer}>
        <Grid className={styles.footerContent}>
            <Row>
                <Col xs={12} md={4}>
                    <Contacts />
                </Col>
                <Col xs={12} md={8}>
                    <FooterLinks />
                </Col>
            </Row>
        </Grid>
    </footer>
);

export default Footer;
