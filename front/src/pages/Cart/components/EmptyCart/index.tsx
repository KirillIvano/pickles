import React from 'react';
import {Link} from 'react-router-dom';

import {ButtonLink, Grid} from '@/uikit';

import styles from './styles.scss';

const EmptyCart = () => (
    <Grid className={styles.emptyCart}>
        <h1 className={styles.headline}>Корзина пуста</h1>
        <h2 className={styles.emptyCartInfo}>
            {'Сюда можно добавить товары из '}
            <Link
                className={styles.catalogAnchor}
                to={'/catalog'}
            >
                {'каталога'}
            </Link>
        </h2>

        <ButtonLink
            className={styles.catalogButton}
            to={'/catalog'}
        >
            Перейти в каталог
        </ButtonLink>
    </Grid>
);

export default EmptyCart;
