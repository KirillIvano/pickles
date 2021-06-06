import React from 'react';

import {CartButton} from '@/components';

import {useFeaturingIdSafe} from '../../hooks/useFeaturingIdSafe';


const FeaturingCartButton = () => {
    const featuringId = useFeaturingIdSafe();

    return <CartButton productId={featuringId} />;
};

export default FeaturingCartButton;
