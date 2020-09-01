import React from 'react';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';

import {NAV_ITEMS} from '@/constants/nav';

import styles from './styles.scss';
import {NavItem, CartNavItem} from './../';


type NavbarProps = {
    isOpen: boolean;
}

const MobileNav = ({
    isOpen,
}: NavbarProps) => (
    <Transition in={isOpen} timeout={300}>
        {stage => (
            <nav className={classnames(
                styles.navbar,
                styles[stage] as string,
            )}>
                <NavItem
                    wrapperClass={styles.navItem}
                    path={NAV_ITEMS.catalog.path}
                    name={NAV_ITEMS.catalog.name}
                />
                <NavItem
                    wrapperClass={styles.navItem}
                    path={NAV_ITEMS.delivery.path}
                    name={NAV_ITEMS.delivery.name}
                />

                <CartNavItem
                    className={styles.navItem}
                />
            </nav>
        )}
    </Transition>
);

export default MobileNav;
