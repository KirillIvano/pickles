import React from 'react';

import {Grid} from '@/uikit';

import {Contacts, FooterLinks} from './components';
import styles from './styles.scss';

const Footer = () => (
    <footer className={styles.footer}>
        <Grid className={styles.footerContent}>
            <Contacts />
            <FooterLinks />
        </Grid>
    </footer>
);

export default Footer;
