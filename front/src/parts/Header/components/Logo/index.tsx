import React from 'react';

import {Reference} from '@/components';

import styles from './styles.scss';
import logoSrc from './images/logo.svg';


const Logo = () => (
    <Reference
        data-e2e="header__logo"
        className={styles.logoContainer} to={'/'}
    >
        <img
            className={styles.logo}
            src={logoSrc}
            alt={'Логотип-ссылка на каталог'}
        ></img>
    </Reference>
);

export default Logo;
