import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {renderForDesktopHOC} from '@/contexts/DeviceContext';
import {useDebouncer} from '@/hooks/useDebouncer';

import styles from './styles.scss';
import {getStagesCount} from './helpers';
import {CarouselContent, CarouselProgress} from './components';


type CarouselControlsProps = {
    offset: number;
    maxOffset: number;
    setOffset: (newOffset: number) => void;
}
const CarouselControls = renderForDesktopHOC(({
    offset,
    maxOffset,
    setOffset,
}: CarouselControlsProps) => (
    <>
        {offset !== 0 && (
            <div
                onClick={() => setOffset(offset - 1)}
                className={styles.carouselLeftControl}
            />
        )}

        {offset !== maxOffset - 1 && (
            <div
                onClick={() => setOffset(offset + 1)}
                className={styles.carouselRightControl}
            />
        )}
    </>
));


type CarouselProps = {
    capacity: number;
    children: React.ReactNode[];
}
const Carousel = ({
    capacity,
    children,
}: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [itemWidth, setItemWidth] = useState(0);
    const [carouselOffset, setCarouselOffset] = useState(0);

    const updateSizes = useCallback(() => {
        if (carouselRef.current) {
            const carouselWidth = carouselRef.current.clientWidth;
            setItemWidth(carouselWidth / capacity);
        }
    }, [capacity]);

    const sizeUpdatesDebouncer = useDebouncer(200);
    const updatedSizesDebounced = useCallback(
        () => sizeUpdatesDebouncer.perform(updateSizes),
        [sizeUpdatesDebouncer, updateSizes],
    );

    useEffect(() => {
        updateSizes();
    }, [capacity, updateSizes]);

    useEffect(() => {
        window.addEventListener('resize', updatedSizesDebounced);

        return () => window.removeEventListener(
            'resize',
            updatedSizesDebounced,
        );
    }, [updatedSizesDebounced]);

    const stagesCount = getStagesCount(children.length, capacity);

    return (
        <div className={styles.carousel} ref={carouselRef}>
            <CarouselContent
                items={children}
                stagesCount={stagesCount}
                currentStage={carouselOffset}

                itemWidth={itemWidth}

                setCurrentStage={setCarouselOffset}
            />
            <CarouselProgress
                stagesCount={stagesCount}
                currentStage={carouselOffset}
            />

            <CarouselControls
                offset={carouselOffset}
                maxOffset={stagesCount}
                setOffset={setCarouselOffset}
            />
        </div>
    );
};

export default Carousel;
