import React from 'react';
import {observer} from 'mobx-react-lite';

import {UserRetailType} from '@/entities/user/types';
import {Featuring} from '@/parts';

import {useCatalogRetailType} from '../../hooks/useCatalogRetailType';


const CatalogFeaturing = observer(({className}: {className?: string}) => {
    const retailType = useCatalogRetailType();

    return retailType === UserRetailType.WHOLE ?
        <Featuring className={className} /> : null;
});

export default CatalogFeaturing;
