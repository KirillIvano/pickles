import {useCategoriesStore} from '@/entities/productCategory/hooks';
import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react-lite';

import styles from './styles.scss';
import CatalogUselessText from '../CatalogUselessText';
import {useCatalogStoreContext} from '../../hooks/useCatalogStoreContext';


export type CatalogDescriptionProps = {
    className?: string;
}

const CatalogDescription = observer(({
    className,
}: CatalogDescriptionProps) => {
    const {categoryId} = useCatalogStoreContext();
    const categoriesStore = useCategoriesStore();

    if (!categoryId) return <CatalogUselessText />;

    const category = categoriesStore.getCategoryById(categoryId);

    if (!category || !category.description) return null;

    const {description} = category;

    return (
        <div className={cn(className, styles.desription)}>
            <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
    );
});

export default CatalogDescription;
