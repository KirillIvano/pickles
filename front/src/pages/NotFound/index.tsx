import React from 'react';
import {ButtonLink, Grid} from '@/uikit';

import styles from './styles.scss';

const NotFound = () => (
    <Grid>
        <div className={styles.notFound}>
            <h1 className={styles.heading}>Страница не найдена</h1>

            <ButtonLink className={styles.catalogLink} to="/catalog">
            В каталог
            </ButtonLink>
        </div>
    </Grid>
);

export default NotFound;
