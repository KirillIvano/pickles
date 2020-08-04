export const createDebouncer = (func: () => void, delay: number) => {
    let presentTimeout: number | null = null;

    return () => {
        if (presentTimeout !== null) {
            clearTimeout(presentTimeout);
        }

        presentTimeout = window.setTimeout(() => {
            func();
            presentTimeout = null;
        }, delay);
    };
};
