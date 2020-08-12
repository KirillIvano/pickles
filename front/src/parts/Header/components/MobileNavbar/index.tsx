import React from 'react';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';

import {NAV_ITEMS} from '@/constants/nav';
import {Grid} from '@/uikit';

import styles from './styles.scss';
import {NavItem} from './../';


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
                <Grid className={styles.navbarContent}>
                    {NAV_ITEMS.map(navItem => (
                        <NavItem
                            wrapperClass={styles.navItem}
                            key={navItem.path}
                            {...navItem}
                        />
                    ),
                    )}
                </Grid>
            </nav>
        )}
    </Transition>
);

export default MobileNav;
