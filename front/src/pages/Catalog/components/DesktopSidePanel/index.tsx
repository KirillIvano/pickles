import React from 'react';

import styles from './styles.scss';
import {
    PriceSelect,
    ProductsSearch,
    DesktopSortSelect,
    CategorySelect,
} from '..';
import GroupSelect from '../GroupSelect';


const DesktopSidePanel = () => {
    return (
        <div className={styles.sidePanel}>
            <ProductsSearch />
            <DesktopSortSelect />
            <CategorySelect />
            <GroupSelect />

            <div className={styles.priceSelectWrapper}>
                <PriceSelect />
            </div>
        </div>
    );
};

export default DesktopSidePanel;
