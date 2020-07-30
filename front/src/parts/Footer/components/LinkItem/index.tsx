import React from 'react';

import {Reference} from '@/components';

import styles from './styles.scss';


type LinkItemProps = {
    name: string;
    path: string;
}

const LinkItem = ({name, path}: LinkItemProps) => (
    <Reference
        to={path}
        className={styles.linkItem}
    >
        {name}
    </Reference>
);

export default LinkItem;
