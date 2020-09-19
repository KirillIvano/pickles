export const getProgressDashArray = (height: number, progress: number) => {
    const len = height * Math.PI;

    const filledLen = len * progress;
    const emptyLen = len - filledLen;

    return `${filledLen},${emptyLen}`;
};
