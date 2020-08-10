import React from 'react';

import {OptionsList} from '@/uikit';

import {useProductFiltersContext} from '../../hooks/useFiltersContext';
import {getSortingPolicyName, getSortingPolicies} from '../../helpers';


const MobileSortSelect = () => {
    const {sortingPolicy, setSortingPolicy} = useProductFiltersContext();

    return (
        <OptionsList>
            {getSortingPolicies().map(
                policy => (
                    <OptionsList.Option
                        key={policy}
                        isSelected={sortingPolicy === policy}
                        caption={getSortingPolicyName(policy)}
                        handleSelect={() => setSortingPolicy(policy)}
                    />
                ),
            )}
        </OptionsList>
    );
};

export default MobileSortSelect;
