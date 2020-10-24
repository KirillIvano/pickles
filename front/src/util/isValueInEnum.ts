export const isValueInEnum = <TEnum extends object>(
    enumObject: TEnum,
    value: unknown,
) => Object.keys(enumObject)
        .map(k => enumObject[k as never])
        .indexOf(value as never) !== -1;
