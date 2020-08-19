export const runAfterRender = (handler: () => void) =>
    setTimeout(handler, 0);
