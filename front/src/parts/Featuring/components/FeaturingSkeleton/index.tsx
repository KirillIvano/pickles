import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.scss';


const FeaturingSkeleton = () => (
    <div
        data-e2e="featuring__skeleton"
        className={styles.skeletonContainer}
    >
        <Skeleton
            circle={true}
            height={100}
            width={100}
        />

        <div>
            <Skeleton height={26} width={120} />

            <div className={styles.contentSkeleton}>
                <Skeleton
                    count={2}
                    className={styles.contentSkeletonItem}
                />
            </div>
        </div>
    </div>
);

export default FeaturingSkeleton;
