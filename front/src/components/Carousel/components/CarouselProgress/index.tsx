import React, {useMemo} from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type CarouselProgressProps = {
    stagesCount: number;
    currentStage: number;
}
const CarouselProgress = ({
    stagesCount,
    currentStage,
}: CarouselProgressProps) => {
    const points = useMemo(
        () => new Array(Math.max(stagesCount, 0)).fill(true),
        [stagesCount],
    );

    if (stagesCount <= 1) return null;

    return (
        <div className={styles.carouselProgress}>
            {points.map(
                (_, ind) => (
                    <div
                        key={ind}
                        className={classnames(
                            styles.progressItem,
                            {[styles.currentItem]: ind === currentStage},
                        )}
                    />
                ),
            )}
        </div>
    );
};

export default CarouselProgress;
