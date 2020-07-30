import React from 'react';
import classnames from 'classnames';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';

import styles from './styles.scss';
import {Logo, DesktopNav} from './../';

const Header = () => (
    <header className={styles.header}>
        <div className={classnames(styles.headerContent, 'container')}>
            <Logo />
            <DesktopNav />
        </div>
    </header>
);

export default renderForDesktopHOC(Header);
