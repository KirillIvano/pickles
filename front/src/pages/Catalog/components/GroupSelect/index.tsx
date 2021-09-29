import React from 'react';
import {observer} from 'mobx-react-lite';

import {OptionsList} from '@/uikit';
import {useGroupsStore} from '@/entities/productGroup/hooks';

import styles from './styles.scss';
import {useCatalogStoreContext} from '../../hooks/useCatalogStoreContext';
import {useGroupIdUpdater} from '../../hooks/useGroupIdUpdater';


const GroupSelect = observer(() => {
    const {groupsPreviews} = useGroupsStore();
    const {groupId} = useCatalogStoreContext();
    const updateGroupId = useGroupIdUpdater();

    const handleSetGroup = (groupId: number | null) => {
        updateGroupId(groupId);
    };

    return (
        <div className={styles.groupSelect}>
            <h2 className={styles.heading}>Подборки</h2>

            <OptionsList >
                <OptionsList.Option
                    handleSelect={() => handleSetGroup(null)}
                    isSelected={groupId === null}
                    caption={'Все'}
                />

                {groupsPreviews.map(
                    ({id, name}) => (
                        <OptionsList.Option
                            isSelected={id === groupId}
                            handleSelect={() => handleSetGroup(id)}
                            caption={name}
                            key={id}
                        />
                    ),
                )}
            </OptionsList>
        </div>
    );
});

export default GroupSelect;
