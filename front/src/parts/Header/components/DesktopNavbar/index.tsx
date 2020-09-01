import React from 'react';

import {NAV_ITEMS} from '@/constants/nav';

import styles from './styles.scss';
import {NavItem, CartNavItem} from './../';


const DesktopNav = () => (
    <nav className={styles.navbar}>
        <NavItem
            wrapperClass={styles.navItemWrapper}
            path={NAV_ITEMS.catalog.path}
            name={NAV_ITEMS.catalog.name}
        />
        <NavItem
            wrapperClass={styles.navItemWrapper}
            path={NAV_ITEMS.delivery.path}
            name={NAV_ITEMS.delivery.name}
        />

        <CartNavItem
            className={styles.navItemWrapper}
        />
    </nav>
);

export default DesktopNav;
