import React from 'react';

import CategoryDescription from './CategoryDescription';
import GroupDescription from './GroupDescription';

import {useCatalogStoreContext} from '../../hooks/useCatalogStoreContext';

const Description = () => {
    const {groupId} = useCatalogStoreContext();

    return groupId
        ? <GroupDescription />
        : <CategoryDescription />;
};

export default Description;
