import React, {useState} from 'react';
import classnames from 'classnames';

import {renderForMobileHOC} from '@/contexts/DeviceContext';

import styles from './styles.scss';
import {MobileNavbar, Burger, Logo} from './..';


const MobileHeader = () => {
    const [isNavOpened, openNav] = useState(false);

    const toggleNav = () => openNav(s => !s);

    return (
        <>
            <header className={styles.header}>
                <div className={classnames('container', styles.headerContent)}>
                    <Logo />
                    <Burger
                        isActive={isNavOpened}
                        handleClick={toggleNav}
                    />
                </div>
            </header>
            <MobileNavbar isOpen={isNavOpened} />
        </>
    );
};

export default renderForMobileHOC(MobileHeader);