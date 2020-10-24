import React from 'react';
import {observer} from 'mobx-react-lite';

import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';
import {ButtonLink} from '@/uikit';

import styles from './styles.scss';


const CatalogRetailType = observer(() => {
    const {retailType, showRetailModal} = useUserStore();

    return (
        <div className={styles.retailHeaderContainer}>
            <h1 className={styles.retailHeader}>
                {retailType === UserRetailType.RETAIL ? 'Розничный каталог' : 'Оптовый каталог'}
            </h1>

            <ButtonLink
                to={retailType === UserRetailType.RETAIL ? '/catalog' : '/catalog/retail'}
                handleInteract={showRetailModal}
                className={styles.retailChangeBtn}
            >
                {retailType === UserRetailType.RETAIL ? 'В оптовый каталог' : 'В розничный каталог'}
            </ButtonLink>
        </div>
    );
});

export default CatalogRetailType;
