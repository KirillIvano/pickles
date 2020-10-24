import React from 'react';
import {Link} from 'react-router-dom';

import {ButtonLink} from '@/uikit';

import styles from './styles.scss';
import { useUserStore } from '@/entities/user/hooks';
import { UserRetailType } from '@/entities/user/types';
import { NAV_ITEMS } from '@/constants/nav';


const EmptyCart = () => {
    const {retailType} = useUserStore();

    const catalogHref = (
        retailType === UserRetailType.RETAIL ?
            NAV_ITEMS.retailCatalog :
            NAV_ITEMS.catalog
    ).path;

    return (
        <div className={styles.emptyCart}>
            <h1 className={styles.headline}>Корзина пуста</h1>
            <h2 className={styles.emptyCartInfo}>
                {'Сюда можно добавить товары из '}
                <Link
                    className={styles.catalogAnchor}
                    to={catalogHref}
                >
                    {'каталога'}
                </Link>
            </h2>

            <ButtonLink
                className={styles.catalogButton}
                to={catalogHref}
            >
            Перейти в каталог
            </ButtonLink>
        </div>
    );
};

export default EmptyCart;
