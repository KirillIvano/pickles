import React from 'react';
import classnames from 'classnames';

import {Contacts, FooterLinks} from './components';
import styles from './styles.scss';

const Footer = () => (
    <footer className={styles.footer}>
        <div className={classnames(styles.footerContent, 'container')}>
            <Contacts />
            <FooterLinks />
        </div>
    </footer>
);

export default Footer;
