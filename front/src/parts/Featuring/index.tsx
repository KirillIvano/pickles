import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {FeaturingContent, FeaturingSkeleton} from './components';
import {featuringStore} from './localStore';


export type FeaturingProps = {
    className?: string;
}

const Featuring = observer(({className}: FeaturingProps) => {
    const {
        featuringLoadingInProgress,
        featuringLoadingError,
        featuringId,
    } = featuringStore;

    useEffect(() => {
        featuringStore.getFeaturing();
    }, []);

    if (!featuringId) return null;
    if (featuringLoadingError) return null;
    if (featuringLoadingInProgress) return (
        <div className={className}>
            <FeaturingSkeleton />
        </div>
    );

    return (
        <div className={className}>
            <FeaturingContent />
        </div>
    );
});

export default Featuring;
