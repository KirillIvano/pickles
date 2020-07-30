import React from 'react';

import {NAV_ITEMS} from '@/constants/nav';

import styles from './styles.scss';
import {NavItem} from './../';

const DesktopNav = () => (
    <nav className={styles.navbar}>
        {NAV_ITEMS.map(navItem =>
            (<NavItem
                wrapperClass={styles.navItemWrapper}
                key={navItem.path}
                {...navItem}
            />),
        )}
    </nav>
);

export default DesktopNav;
