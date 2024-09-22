type CallBack = (match: RegExpMatchArray, index: number) => string;

export const strReplaceCallBack = (
  str: string,
  pattern: string | RegExp,
  callback: CallBack
) => {
  if (!(pattern instanceof RegExp)) {
    try {
      pattern = new RegExp(pattern);
    } catch (err) {
      return str;
    }
  }

  const strLen = str.length;

  let i = 0;

  while (pattern.test(str)) {
    const strPatternMatch = str.match(pattern) as RegExpMatchArray;
    const replacementContent = callback(strPatternMatch, i);

    str = str
      .slice(0, strPatternMatch.index)
      .concat(
        replacementContent,
        str.slice(Number(strPatternMatch.index) + strPatternMatch[0].length)
      );

    if (i > strLen * 2) {
      break;
    }

    i++;
  }

  return str;
};
