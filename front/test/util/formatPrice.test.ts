/// <reference types="@types/jest" />

import {formatPrice} from './../../src/util/formatPrice';

describe('Форматирование цены', () => {
    test(
        'Маленькая цена должна не обрезаться',
        () => {
            expect(formatPrice(1)).toBe('1');
        },
    );

    test(
        'У большой цены должны появиться пробелы',
        () => {
            expect(formatPrice(10000000)).toBe('10 000 000');
        },
    );

    test(
        'У цены кратной трём должны появиться пробелы только внутри',
        () => {
            expect(formatPrice(100000)).toBe('100 000');
        },
    );
});
