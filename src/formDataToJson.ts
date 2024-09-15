import deepmerge from "deepmerge";
import { noEmpty } from "./strings";

const evaluateProperty = (
  keyTreePath: Array<string | number>,
  value: any
): any => {
  let data = value as any;

  // const formDataArrayKeyRe = /(\[\])$/;

  // if (formDataArrayKeyRe.test(key)) {
  //   data = [data];
  // }

  const reversedKeyTreePath = keyTreePath.reverse();

  for (const property of reversedKeyTreePath) {
    data = {
      [property]: data,
    };
  }

  return data;
};

const rewriteArraysKeys = <JsonDataObject extends object = any>(
  jsonData: JsonDataObject
): JsonDataObject => {
  const isOriginallyArray = (dataObject: any): boolean => {
    if (typeof dataObject !== "object") {
      return false;
    }

    if (!(dataObject instanceof Array)) {
      for (const key in dataObject) {
        if (isNaN(Number(key))) {
          return false;
        }
      }
    }

    return true;
  };

  for (const key in jsonData) {
    const value = jsonData[key];

    if (typeof value === "object" && value && isOriginallyArray(value)) {
      const rewrittenValue = [] as Array<unknown>;

      // let implicitIndex = 0;

      // console.log("\n\n\n-------------------\n\n\n");

      // const keys = Object.keys(value)
      //   .map((key) => {
      //     return Number(key);
      //   })
      //   .sort();

      // console.log(
      //   "\n\n\n\n\n>>> Keys -> ",
      //   keys,
      //   "\n\nValue -> ",
      //   value,
      //   "\n\n\n\n"
      // );

      Object.keys(value)
        .map((key) => {
          // if (typeof key === "number" && isNaN(key)) {
          //   return key;
          // }

          // let currentKey =
          //   !key || !noEmpty(key) ? implicitIndex++ : Number(key);

          // if (!isNaN(currentKey)) {
          //   currentKey = implicitIndex++;
          // }

          // return currentKey;
          return Number(key);
        })
        .sort()
        .forEach((key) => {
          // console.log(">>> key: ", key, "\n\n\n");

          rewrittenValue.push(value[key as keyof typeof value]);
        });

      jsonData[key as keyof JsonDataObject] = rewriteArraysKeys(
        rewrittenValue
      ) as JsonDataObject[keyof JsonDataObject];

      continue;
    }

    if (typeof value === "object" && value) {
      jsonData[key] = rewriteArraysKeys(value);
    }
  }

  return jsonData;
};

export const formDataToJson = <JsonDataObject extends object = any>(
  formData: FormData
): JsonDataObject => {
  let jsonData = {} as JsonDataObject;
  let implicitIndex = 0;

  const getFormDataKeyTreePath = (key: string): Array<string | number> => {
    const re = /(\]?\[|\]\[?)/;

    return key
      .split(re)
      .slice(0, -1)
      .filter((keySlice) => {
        return !re.test(keySlice);
      })
      .map((keySlice) => {
        if (!noEmpty(keySlice)) {
          return implicitIndex++;
        }

        const keySliceAsNumber = Number(keySlice);

        if (!isNaN(keySliceAsNumber)) {
          return keySliceAsNumber;
        }

        return keySlice;
      });
  };

  formData.forEach((value, key) => {
    const keyTreePath = getFormDataKeyTreePath(key);

    let data = evaluateProperty(keyTreePath, value);

    jsonData = deepmerge(jsonData, data);
  });

  return rewriteArraysKeys(jsonData);
};
