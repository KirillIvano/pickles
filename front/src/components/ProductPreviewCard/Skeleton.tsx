import React from 'react';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.scss';


export type ProductPreviewSkeletonProps = {
    className?: string;
}

const ProductPreviewCardSkeleton = ({
    className,
}: ProductPreviewSkeletonProps) => (
    <div className={cn(className, styles.productCardSkeleton)}>
        <Skeleton className={styles.skeletonImage} />

        <div className={styles.skeletonContent}>
            <Skeleton
                height={24}
                width="30%"
            />
            <Skeleton
                height={16}
                width="60%"
                className={styles.skeletonName}
            />
        </div>

        <Skeleton height={40} />
    </div>
);

export default ProductPreviewCardSkeleton;
