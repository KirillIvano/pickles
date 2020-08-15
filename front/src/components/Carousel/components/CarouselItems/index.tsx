import React from 'react';

import styles from './styles.scss';

type CarouselContentItemsProps = {
    items: React.ReactNode[];
    itemWidth: number;
}
const CarouselContentItems = React.memo(
    ({
        items,
        itemWidth,
    }: CarouselContentItemsProps) => (
        <div className={styles.carouselContent}>
            {items.map((item, ind) => (
                <div
                    style={{minWidth: itemWidth}}
                    key={ind}
                >
                    {item}
                </div>
            ))}
        </div>
    ),
);
CarouselContentItems.displayName = 'CarouselItems';

export default CarouselContentItems;
