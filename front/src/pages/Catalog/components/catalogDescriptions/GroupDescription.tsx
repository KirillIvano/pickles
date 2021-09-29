import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react-lite';

import {useGroupsStore} from '@/entities/productGroup/hooks';

import styles from './styles.scss';
import {useCatalogStoreContext} from '../../hooks/useCatalogStoreContext';
import {CatalogUselessText} from '..';


export type CatalogDescriptionProps = {
    className?: string;
}

const GroupDescription = observer(({
    className,
}: CatalogDescriptionProps) => {
    const {groupId} = useCatalogStoreContext();
    const groupsStore = useGroupsStore();

    if (!groupId) return <CatalogUselessText />;

    const group = groupsStore.getGroupById(groupId);
    if (!group || !group.description) return null;

    const {description} = group;

    return (
        <div className={cn(className, styles.desription)}>
            <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
    );
});

export default GroupDescription;
