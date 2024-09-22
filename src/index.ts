import { compareSync } from "bcryptjs";

import { PathInternal } from "./eager";
import { noEmpty } from "./strings";

export * from "./arrays";
export * from "./cookies";
export * from "./eager";
export * from "./filterValidImageFiles";
export * from "./formDataToJson";
export * from "./generateSlagFromTitle";
export * from "./getJsonFileData";
export * from "./getQueryMatchSearchParams";
export * from "./getSearchParamsQueryArgument";
export * from "./getUrlQueryParams";
export * from "./Hash";
export * from "./images";
export * from "./numbers";
export * from "./strings";
export * from "./strings/stripStrAccents";
export * from "./types";
export * from "./validations";

export const generateRandomId = (): string =>
  "10" +
  Math.random().toString().replace(/\./g, "") +
  Date.now() +
  Math.round(Date.now() * Math.random());

export const getObjectProps = <ObjectType = object>(
  object: ObjectType,
  props: Array<keyof ObjectType> | keyof ObjectType
): ObjectType => {
  const objectData: ObjectType = {} as ObjectType;

  props = props instanceof Array ? props : [props];

  for (const prop of props) {
    const key = prop as keyof ObjectType;

    if (noEmpty(prop) && typeof object[key] !== typeof undefined) {
      objectData[key] = object[key];
    }
  }

  return objectData;
};

export const getObjectProp = <
  PropType = unknown,
  ObjectType extends object = object
>(
  property: PathInternal<ObjectType>,
  object: ObjectType
): PropType | null => {
  const re = /(\.|:)+/;
  const propertySlices = property
    .split(re)
    .filter((slice: string) => !re.test(slice));

  if (propertySlices.length < 1) {
    return null;
  }

  let objectPropertyValue: unknown = object;

  for (const propertySlice of propertySlices) {
    if (
      objectPropertyValue &&
      typeof objectPropertyValue === "object" &&
      typeof objectPropertyValue[
        propertySlice as keyof typeof objectPropertyValue
      ] !== typeof undefined
    ) {
      objectPropertyValue =
        objectPropertyValue[propertySlice as keyof typeof objectPropertyValue];
    }
  }

  return objectPropertyValue as PropType;
};

export const getAppMasterKeys = (): Array<string> => {
  const environmentVariableKeys = Object.keys(process.env);
  const masterKeyRe = /^(((NEXT_PUBLIC|REACT_APP)_)?APP_MASTER_KEY_(.+))$/;

  return environmentVariableKeys
    .filter((key) => masterKeyRe.test(key))
    .map<string>((key) => String(process.env[key]));
};

export const isMasterKey = (data: string): boolean => {
  const appMasterKeys = getAppMasterKeys();

  for (const appMasterKey of appMasterKeys) {
    if (compareSync(data, appMasterKey)) {
      return true;
    }
  }

  return false;
};

export const strMatches = (
  firstString: string,
  secondString: string
): boolean => {
  const lower = (str: string): string => str.toLowerCase();

  if (
    firstString === secondString ||
    lower(firstString) === lower(secondString)
  ) {
    return true;
  }

  return Boolean(
    lower(firstString).includes(lower(secondString)) ||
      lower(secondString).includes(lower(firstString))
  );
};

export const queryParamsObjectToString = (
  queryParamsObject: object
): string => {
  const queryParamsKeyValuePairs = Object.keys(queryParamsObject).map((key) => {
    return `${key}=${queryParamsObject[key as keyof typeof queryParamsObject]}`;
  });

  return queryParamsKeyValuePairs.join("&");
};

export const convertBlobToFile = (
  blobObject: Blob,
  fileName?: string,
  options?: FilePropertyBag
): File => {
  return new File(
    [blobObject],
    fileName ?? `${generateRandomId()}.jpg`,
    options
  );
};

export const formatCurrency = (
  amount: number,
  currency: string = "AKZ"
): string =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: currency,
  }).format(amount);

export const generateRandomAlphaNumericId = (length: number = 12): string => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsetLength = charset.length;
  const randomValues = new Uint32Array(length);

  crypto.getRandomValues(randomValues);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charsetLength];
  }

  return result;
};
