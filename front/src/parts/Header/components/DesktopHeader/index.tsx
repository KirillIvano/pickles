import React from 'react';
import classnames from 'classnames';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';
import {Grid} from '@/uikit';

import styles from './styles.scss';
import {Logo, DesktopNav} from './../';

const Header = () => (
    <header data-e2e="header" className={styles.header}>
        <Grid className={classnames(styles.headerContent)}>
            <Logo />
            <DesktopNav />
        </Grid>
    </header>
);

export default renderForDesktopHOC(Header);
