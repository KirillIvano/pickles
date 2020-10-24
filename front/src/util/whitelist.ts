export const clearFalsy = <T extends Record<string, unknown>>(source: T) =>
    Object.keys(source).reduce(
        (acc: Record<string, unknown>, key) => {
            if (source[key]) {
                acc[key] = source[key];
            }

            return acc;
        },
        {},
    );
