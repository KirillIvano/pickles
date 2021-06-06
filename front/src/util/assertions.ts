class AssertionError extends Error {}

export function assertExists<T,>(x: T | null | undefined): asserts x is T {
    if (x == undefined) {
        throw new AssertionError();
    }
}

export const tryValue = <T,>(x: T | undefined): T => {
    assertExists(x);

    return x;
};
