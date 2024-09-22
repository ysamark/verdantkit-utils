import { stripStrAccents } from "./strings/stripStrAccents";

export type GenerateSlagFromTitleUtilArgsWithTitle = [string];

export type GenerateSlagFromTitleUtilArgsWithTitleAndSignature = [
  string,
  boolean
];

export type GenerateSlagFromTitleUtilArgsWithOptions = [
  {
    title: string;
    signature?: boolean;
  }
];

export type GenerateSlagFromTitleUtilArgs =
  | GenerateSlagFromTitleUtilArgsWithTitle
  | GenerateSlagFromTitleUtilArgsWithTitleAndSignature
  | GenerateSlagFromTitleUtilArgsWithOptions;

type GenerateSlagFromTitleUtilOptions = {
  title: string;
  signature: boolean;
};

const readArgs = (
  ...args: GenerateSlagFromTitleUtilArgs
): GenerateSlagFromTitleUtilOptions => {
  const [titleOrOptions, signature] = args;

  if (typeof titleOrOptions === "string") {
    return {
      title: stripStrAccents(titleOrOptions),
      signature: Boolean(signature),
    };
  }

  return {
    title: stripStrAccents(titleOrOptions.title),
    signature: Boolean(titleOrOptions.signature),
  };
};

export const generateSlagFromTitle = (
  ...args: GenerateSlagFromTitleUtilArgs
): string => {
  const { title, signature = false } = readArgs(...args);

  const re = /(\s+|[^a-zA-Z0-9_\-.])/;

  return title
    .split(re)
    .filter((strSlice) => !re.test(strSlice))
    .join("-")
    .split(/[_\-.]+/)
    .join("-")
    .replace(/^(\s*-+\s*)/, "")
    .replace(/(\s*-+\s*)$/, "")
    .toLowerCase()
    .concat(signature ? `-${Math.round(Date.now() * Math.random())}` : "");
};
