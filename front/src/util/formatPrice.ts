// Ставит пробелы 1000 -> 1 000
export const formatPrice = (price: number) => {
    const strPrice = `${price}`;
    const priceLen = strPrice.length;

    if (priceLen < 4) return strPrice;

    const res = [];
    let pos = priceLen;

    while (pos >= 3) {
        res.push(strPrice.slice(pos - 3, pos));
        pos -= 3;
    }

    if (pos !== 0) res.push(strPrice.slice(0, pos));

    return res.reverse().join(' ');
};
