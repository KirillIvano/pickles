import React, { useCallback, useMemo } from 'react';

import {getUniqueId} from '@/util/getUniqueId';
import {Label, Select} from '@/uikit';

import {getSortingPolicies, getSortingPolicyName, getPolicyByName} from '../../helpers';
import {useProductFiltersContext} from '../../hooks/useFiltersContext';
import styles from './styles.scss';

const DesktopSortSelect = () => {
    const {setSortingPolicy} = useProductFiltersContext();

    const id = useMemo(getUniqueId, []);

    const handleSelectChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortingPolicy(getPolicyByName(e.currentTarget.value) || 'none'),
        [],
    );

    return (
        <div className={styles.selectWrapper}>
            <Label htmlFor={id}>Сортировка</Label>
            <Select
                id={id}
                sizing={'sm'}
                onChange={handleSelectChange}
            >
                {getSortingPolicies().map(
                    policy => (
                        <option
                            key={policy}
                        >
                            {getSortingPolicyName(policy)}
                        </option>
                    ),
                )}
            </Select>
        </div>
    );
};

export default DesktopSortSelect;
