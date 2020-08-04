export const getStagesCount = (
    itemsCount: number,
    capacity: number,
) => itemsCount - capacity + 1;


const getPositionDiff = (
    offset: number,
    itemWidth: number,
) => offset >= 0 ?
    Math.round(offset / itemWidth) :
    -Math.round(-offset / itemWidth);

// calculates new carousel position after dragging
export const getUpdatedPosition = (
    currentPosition: number,
    offset: number,
    maxPosition: number,
    itemWidth: number,
) => {
    if (Math.abs(offset) < itemWidth / 2) return currentPosition;

    const positionDiff = getPositionDiff(offset, itemWidth);
    const updatedPosition = currentPosition + positionDiff;

    if (updatedPosition < 0) return 0;
    if (updatedPosition >= maxPosition) return maxPosition - 1;

    return updatedPosition;
};
