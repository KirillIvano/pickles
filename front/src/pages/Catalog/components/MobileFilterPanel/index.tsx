import React, {useState} from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {
    Menu,
    MenuTogglerBtn,
    Grid,
} from '@/uikit';

import {
    ProductsSearch,
    PriceSelect,
    MobileSortSelect,
    CategorySelect,
} from '..';
import styles from './styles.scss';


enum MenuName {
    FILTER,
    SORTS
}

const MobileFilterPanel = () => {
    const [selectedMenu, setSelectedMenu] = useState<MenuName | null>(null);

    const handleMenuSelect = (menuName: MenuName) => {
        if (menuName === selectedMenu) {
            setSelectedMenu(null);
        } else {
            setSelectedMenu(menuName);
        }
    };

    return (
        <>
            <Grid>
                <ProductsSearch />
                <Row className={styles.filtersTogglers}>
                    <Col xs={6}>
                        <MenuTogglerBtn
                            isOpened={selectedMenu === MenuName.FILTER}
                            caption={'Фильтры'}
                            toggle={() => handleMenuSelect(MenuName.FILTER)}
                        />
                    </Col>
                    <Col xs={6}>
                        <MenuTogglerBtn
                            isOpened={selectedMenu === MenuName.SORTS}
                            caption={'Сортировка'}
                            toggle={() => handleMenuSelect(MenuName.SORTS)}
                        />
                    </Col>
                </Row>
            </Grid>

            <Menu
                className={styles.menu}
                isOpened={selectedMenu === MenuName.FILTER}
            >
                <Grid className={styles.menuContent}>
                    <PriceSelect />
                    <CategorySelect />
                </Grid>
            </Menu>

            <Menu
                className={styles.menu}
                isOpened={selectedMenu === MenuName.SORTS}
            >
                <Grid className={styles.menuContent}>
                    <MobileSortSelect />
                </Grid>
            </Menu>
        </>
    );
};

export default MobileFilterPanel;
