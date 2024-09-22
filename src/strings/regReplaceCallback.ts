import { subStrReplace } from "./subStrReplace";

export const regReplaceCallback = (
  re: RegExp,
  subject: string,
  callback: (match: RegExpExecArray) => string
): string => {
  const matches: Array<RegExpExecArray> = [];
  const slices: Array<string> = [];

  let subjectStr: string = subject;

  let match = re.exec(subjectStr);

  while (match) {
    const matchStr = match[0];

    matches.push(match);

    slices.push(subjectStr.slice(0, match.index));

    subjectStr = subStrReplace(
      subjectStr,
      0,
      match.index + matchStr.length,
      ""
    );

    match = re.exec(subjectStr);
  }

  if (slices.length >= 1) {
    return slices
      .map((slice, index) => `${slice}${callback(matches[index])}`)
      .join("")
      .concat(subjectStr);
  }

  return subject;
};
