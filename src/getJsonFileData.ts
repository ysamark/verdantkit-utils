import { Nullish } from "./types";

type JsonDataValue =
  | string
  | number
  | boolean
  | Array<JsonDataValue | DefaultJsonDataObject>;

type DefaultJsonDataObject =
  | Array<DefaultJsonDataObject>
  | {
      [key: string]: JsonDataValue;
    };

export const getJsonFileData = async <
  JsonDataObject extends object = DefaultJsonDataObject
>(
  jsonFileObject: File | Blob
): Promise<Nullish<JsonDataObject>> =>
  new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (event) => {
      if (!event.target) {
        return resolve(null);
      }

      const jsonFileData = String(event.target.result).trim();

      try {
        const jsonFileDataObject: JsonDataObject = JSON.parse(jsonFileData);

        resolve(jsonFileDataObject);
      } catch (err) {
        resolve(null);
      }
    };

    fileReader.onerror = () => resolve(null);

    fileReader.onabort = () => resolve(null);

    fileReader.readAsText(jsonFileObject, "UTF-8");
  });

export const getJsonFileDataFromUrl = async <
  JsonDataObject extends object = DefaultJsonDataObject
>(
  fileUrl: string | URL
): Promise<Nullish<JsonDataObject>> => {
  const fileAbsoluteUrl = fileUrl instanceof URL ? fileUrl.href : fileUrl;

  try {
    const response = await fetch(fileAbsoluteUrl);
    const fileTextContent = await response.text();

    const jsonFileData = String(fileTextContent).trim();

    try {
      const jsonFileDataObject: JsonDataObject = JSON.parse(jsonFileData);

      return jsonFileDataObject;
    } catch (err) {}

    return null;
  } catch (err) {
    return null;
  }
};
