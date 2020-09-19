const getHalfingDelimiter = (arrLen: number) =>
    arrLen % 2 === 0 ? arrLen / 2 : (arrLen >> 1) + 1;

export const getArrayHalfs = <TArr,>(arr: TArr[]) => {
    const len = arr.length;
    const delimiter = getHalfingDelimiter(len);

    return [arr.slice(0, delimiter), arr.slice(delimiter)];
};
