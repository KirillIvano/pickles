import React from 'react';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';
import {observer} from 'mobx-react-lite';

import {NAV_ITEMS} from '@/constants/nav';
import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';

import styles from './styles.scss';
import {NavItem, CartNavItem} from './../';


type NavbarProps = {
    isOpen: boolean;
}

const MobileNav = observer(({
    isOpen,
}: NavbarProps) => {
    const {retailType} = useUserStore();

    const isRetail = retailType === UserRetailType.RETAIL;

    return (
        <Transition in={isOpen} timeout={300}>
            {stage => (
                <nav className={classnames(
                    styles.navbar,
                styles[stage] as string,
                )}>
                    <ul className={styles.navbarContent}>
                        <NavItem
                            wrapperClass={styles.navItem}
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
                            wrapperClass={styles.navItem}
                            path={NAV_ITEMS.delivery.path}
                            name={NAV_ITEMS.delivery.name}
                        />

                        <CartNavItem
                            className={styles.navItem}
                        />
                    </ul>
                </nav>
            )}
        </Transition>
    );
});

export default MobileNav;
