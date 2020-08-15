import React from 'react';
import classnames from 'classnames';

import {DeviceContext} from '@/contexts/DeviceContext';

import {getUpdatedPosition} from './../../helpers';
import {CarouselItems} from './..';
import styles from './styles.scss';

type CarouselContentProps = {
    items: React.ReactNode[];
    stagesCount: number;
    itemWidth: number;
    currentStage: number;

    rootElementSelector?: string;

    setCurrentStage: (stage: number) => void;
}

enum DragStage {
    STATIC = 'STATIC',
    PREDRAG = 'PREDRAG',
    DRAG = 'DRAG'
}
type CarouselContentStateType = {
    offset: number;
    initialOffset: number;
    dragStage: DragStage;
}
class CarouselContent extends React.Component<CarouselContentProps, CarouselContentStateType> {
    state = {
        offset: 0,
        initialOffset: 0,
        dragStage: DragStage.STATIC,
    }
    rootElement: HTMLDivElement;


    constructor(props: CarouselContentProps) {
        super(props);

        this.rootElement = document.querySelector(props.rootElementSelector || '#root') as HTMLDivElement;
    }

    private blockScreenScroll = () => this.rootElement.style.overflow = 'hidden';
    private unblockScreenScroll = () => this.rootElement.style.overflow = 'initial';

    private handleMobileDragStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.setState({
            initialOffset: e.touches[0].pageX,
            dragStage: DragStage.DRAG,
        });

        window.addEventListener('touchmove', this.handleMobileDrag, {passive: false});
        window.addEventListener('touchend', this.handleMobileDragEnd);
    }
    private handleDesktopDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        this.setState({
            initialOffset: e.pageX,
            dragStage: DragStage.PREDRAG,
        });

        this.blockScreenScroll();
        window.addEventListener('mousemove', this.handleDesktopDrag);
        window.addEventListener('mouseup', this.handleDesktopDragEnd);
    }

    private handleMobileDrag = (e: TouchEvent) => {
        const {initialOffset} = this.state;

        e.preventDefault();

        this.setState({offset: e.touches[0].pageX - initialOffset});
    }
    private handleDesktopDrag = (e: MouseEvent) => {
        const {initialOffset, dragStage} = this.state;

        if (dragStage === DragStage.PREDRAG) {
            this.setState({dragStage: DragStage.DRAG});
        }

        this.setState({offset: e.pageX - initialOffset});
    }

    private handleDragEndCommon = (
        lastPointerPosition: number,
    ) => {
        const {
            currentStage,
            stagesCount,
            itemWidth,

            setCurrentStage,
        } = this.props;
        const {initialOffset} = this.state;

        this.setState({
            dragStage: DragStage.STATIC,
            offset: 0,
        });

        const updatedStage = getUpdatedPosition(
            currentStage,
            initialOffset - lastPointerPosition,
            stagesCount,
            itemWidth,
        );

        setCurrentStage(updatedStage);
    }

    private handleMobileDragEnd = (e: TouchEvent) => {
        this.handleDragEndCommon(e.changedTouches[0].pageX);

        window.removeEventListener('touchmove', this.handleMobileDrag);
        window.removeEventListener('touchend', this.handleMobileDragEnd);
    }
    private handleDesktopDragEnd = (e: MouseEvent) => {
        this.handleDragEndCommon(e.pageX);

        this.unblockScreenScroll();
        window.removeEventListener('mousemove', this.handleDesktopDrag);
        window.removeEventListener('mouseup', this.handleDesktopDragEnd);
    }

    render() {
        const {currentStage, items, itemWidth} = this.props;
        const {dragStage, offset} = this.state;

        return (
            <DeviceContext.Consumer>
                {
                    device => (
                        <div
                            className={classnames(
                                styles.carouselContentWrapper,
                                {[styles.dragged]: dragStage === DragStage.DRAG},
                            )}
                            style={{transform: `translateX(${-(currentStage * itemWidth - offset)}px)`}}
                            onTouchStart={device === 'mobile' ? this.handleMobileDragStart : undefined}
                            onMouseDown={device === 'desktop' ? this.handleDesktopDragStart : undefined}
                        >
                            <div className={styles.carouselContent}>
                                <CarouselItems
                                    items={items}
                                    itemWidth={itemWidth}
                                />
                            </div>
                        </div>
                    )
                }
            </DeviceContext.Consumer>
        );
    }
}

export default CarouselContent;
