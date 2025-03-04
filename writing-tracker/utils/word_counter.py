import re



def word_count(content):
    """
    Splits on space. Splits on em dash after a word UNLESS
    1) it is followed by quotes
    2) it is at the end of a sentence
    Based on regex / logic of following file:
    https://github.com/Jaza/word-count/blob/master/word_count.py
    """

    trim_re = re.compile(r'^\s+|\s+$')
    striptags_re = re.compile(r'<\/?[a-z][^>]*>', re.IGNORECASE)
    stripsymbols_re = re.compile(r'[\"“”‘’;:,.?!]+')  # Remove punctuation but keep dashes
    em_dash_re = re.compile(r'\u2014')
    words_re = re.compile(r"\b[\w\u2013\u002D]+(?:'[a-zA-Z]+)*\b")

    c = trim_re.sub('', content)
    c = striptags_re.sub('', c)
    c = stripsymbols_re.sub('', c)  # Strip symbols
    c = em_dash_re.sub(' ', c)  # Replace all dash types with spaces

    match = words_re.findall(c)

    return match and len(match) or 0

