import React from 'react';
import {observer} from 'mobx-react-lite';

import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';
import {useCategoryById} from '@/entities/productCategory/hooks';
import {CategoryPreview} from '@/entities/productCategory/types';
import {ButtonLink} from '@/uikit';

import {useCategoryId} from '../../hooks/useCategoryId';
import styles from './styles.scss';


const getHeadingText = (name: string | undefined, retailType: UserRetailType) =>
    name
        ? `${name} ${retailType === UserRetailType.RETAIL ? 'в розницу' : 'оптом'}`
        : `${retailType === UserRetailType.RETAIL ? 'Розничный' : 'Оптовый'} каталог`;

const CatalogRetailType = observer(() => {
    const {retailType, showRetailModal} = useUserStore();
    const categoryId = useCategoryId();
    const {name} = (useCategoryById(categoryId) ?? {}) as CategoryPreview;

    return (
        <div className={styles.retailHeaderContainer}>
            <h1 className={styles.retailHeader}>
                {getHeadingText(name, retailType)}
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
