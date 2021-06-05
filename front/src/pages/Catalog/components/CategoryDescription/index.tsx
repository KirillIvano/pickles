import {useCategoryById} from '@/entities/productCategory/hooks';
import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react-lite';

import {useCategoryId} from '../../hooks/useCategoryId';
import styles from './styles.scss';


export type CatalogDescriptionProps = {
    className?: string;
}

const CatalogDescription = observer(({
    className,
}: CatalogDescriptionProps) => {
    const categoryId = useCategoryId();
    const category = useCategoryById(categoryId);

    if (!category || !category.description) return null;

    const {description, name} = category;

    return (
        <div className={cn(className, styles.categoryDesription)}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.description}>{description}</p>
        </div>
    );
});

export default CatalogDescription;
