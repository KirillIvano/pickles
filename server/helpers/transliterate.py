from transliterate import translit as tl


def translit(string: str) -> str:
    translitted: str = tl(string, 'ru', reversed=True)
    for x in [" ", "_", "%", "+", "=", ".", ","]:
        translitted = translitted.replace(x, '-')
    return translitted.lower()
