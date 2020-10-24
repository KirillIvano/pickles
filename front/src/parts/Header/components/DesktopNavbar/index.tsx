import React from 'react';
import {observer} from 'mobx-react-lite';

import {NAV_ITEMS} from '@/constants/nav';
import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';

import styles from './styles.scss';
import {NavItem, CartNavItem} from './../';


const DesktopNav = observer(() => {
    const {retailType} = useUserStore();
    const isRetail = retailType === UserRetailType.RETAIL;

    return (
        <nav className={styles.navbar}>
            <NavItem
                wrapperClass={styles.navItemWrapper}
                path={
                    isRetail ?
                        NAV_ITEMS.retailCatalog.path :
                        NAV_ITEMS.catalog.path
                }
                name={
                    isRetail ?
                        NAV_ITEMS.retailCatalog.name :
                        NAV_ITEMS.catalog.name
                }
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
});

export default DesktopNav;
