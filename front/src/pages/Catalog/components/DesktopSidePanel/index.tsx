import React from 'react';

import styles from './styles.scss';
import {
    PriceSelect,
    ProductsSearch,
    DesktopSortSelect,
    CategorySelect,
} from '..';


const DesktopSidePanel = () => {
    return (
        <div className={styles.sidePanel}>
            <ProductsSearch />
            <DesktopSortSelect />
            <CategorySelect />
            <div className={styles.priceSelectWrapper}>
                <PriceSelect />
            </div>
        </div>
    );
};

export default DesktopSidePanel;
