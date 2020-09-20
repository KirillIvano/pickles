from transliterate import translit as tl


def translit(string: str) -> str:
    translitted: str = tl(string, 'ru', reversed=True)
    translitted_new = ""
    for ch in translitted:
        if ch in [" ", "_", "%", "+", "=", ".", ",", '/']:
            translitted_new += "-"
        else:
            translitted_new += ch.lower()
    return translitted_new
