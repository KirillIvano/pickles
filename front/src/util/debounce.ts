export const createDebouncer = (delay: number) => {
    let presentTimeout: number | null = null;

    return {
        perform: (func: () => void) => {
            if (presentTimeout !== null) {
                clearTimeout(presentTimeout);
            }

            presentTimeout = window.setTimeout(() => {
                func();
                presentTimeout = null;
            }, delay);
        },
    };
};
