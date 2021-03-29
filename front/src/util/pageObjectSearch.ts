export const po = (strings: TemplateStringsArray, ...e2eIds: string[]) => {
    let res = '';
    const stringsLen = strings.length;

    for (let i = 0; i < stringsLen - 1; i++) {
        res += strings[i] + `[data-e2e=${e2eIds[i]}]`;
    }
    res += strings[stringsLen - 1];

    return res;
};
