import React from 'react';
import {observer} from 'mobx-react-lite';

import {useProductFiltersContext} from '../../hooks/useFiltersContext';
import styles from './styles.scss';

const SortSelect = observer(() => {
    const {setSortingPolicy} = useProductFiltersContext();

    return <button onClick={() => {setSortingPolicy('price_desc');}}>xxx</button>;
});

export default SortSelect;
