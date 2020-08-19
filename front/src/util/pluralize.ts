const CASES = [2, 0, 1, 1, 1, 2];


export const pluralize = (num: number, titles: string[]) =>
    titles[
        (num % 100 > 4 && num % 100 < 20) ? 2 : CASES[(num % 10 < 5) ? num % 10 : 5]
    ];
