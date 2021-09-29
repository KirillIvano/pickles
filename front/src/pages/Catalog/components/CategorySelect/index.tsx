import React from 'react';
import {observer} from 'mobx-react-lite';

import {useCategoriesStore} from '@/entities/productCategory/hooks';
import {OptionsList} from '@/uikit';
import {useQuery} from '@/hooks/useQuery';

import styles from './styles.scss';
import {useCategoryIdUpdater} from '../../hooks/useCategoryIdUpdater';


const CategorySelect = observer(() => {
    const {categoriesPreviews} = useCategoriesStore();
    const {categoryId} = useQuery<{categoryId: string}>();
    const updateCategoryId = useCategoryIdUpdater();

    return (
        <OptionsList className={styles.categorySelect}>
            <OptionsList.Option
                isSelected={!categoryId}
                caption={'Все'}
                handleSelect={() => updateCategoryId(null)}
            />

            {categoriesPreviews.map(
                ({id, name}) => (
                    <OptionsList.Option
                        isSelected={+categoryId === id}
                        caption={name}
                        key={id}
                        handleSelect={() => updateCategoryId(id)}
                    />
                ),
            )}
        </OptionsList>
    );
});

export default CategorySelect;
