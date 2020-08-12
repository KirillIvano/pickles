export const copyText = (text: string) => {
    if (!document.createRange || !document.getSelection) throw new Error('Копирование не поддерживается');

    const tempEl = document.createElement('div');
    tempEl.innerText = text;
    document.body.append(tempEl);

    const range = document.createRange();
    range.selectNode(tempEl);

    const selection = document.getSelection() as Selection;
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    tempEl.remove();
};
