import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import {createDebouncer} from '@/util/debounce';
import {renderForDesktopHOC} from '@/contexts/DeviceContext';

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
    items: React.ReactNode[];
}
const Carousel = ({
    capacity,
    items,
}: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [itemWidth, setItemWidth] = useState(0);
    const [carouselOffset, setCarouselOffset] = useState(0);

    const updateSizes = () => {
        if (carouselRef.current) {
            const carouselWidth = carouselRef.current.clientWidth;
            setItemWidth(carouselWidth / capacity);
        }
    };
    const debouncedSizesUpdate = useMemo(() => createDebouncer(updateSizes, 200), []);

    useEffect(() => {
        updateSizes();
    }, [capacity]);

    useEffect(() => {
        window.addEventListener('resize', debouncedSizesUpdate);

        return () => window.removeEventListener(
            'resize',
            debouncedSizesUpdate,
        );
    }, []);

    const stagesCount = getStagesCount(items.length, capacity);

    return (
        <div className={styles.carousel} ref={carouselRef}>
            <CarouselContent
                items={items}
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
