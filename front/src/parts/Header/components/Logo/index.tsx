import React from 'react';

import {Reference} from '@/components';

import styles from './styles.scss';
import logoSrc from './images/logo.svg';


const Logo = () => (
    <Reference className={styles.logoContainer} to={'/'}>
        <img className={styles.logo} src={logoSrc}></img>
    </Reference>
);

export default Logo;
