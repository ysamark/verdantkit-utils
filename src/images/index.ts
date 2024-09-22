import { convertBlobToFile } from "..";
import { Nullable } from "../types";

export * from "./convertImageFile";
export * from "./convertImageFilesToJpeg";
export * from "./convertImageFileToJpeg";
export * from "./isValidImageFile";

export const getImageObjectFromUrl = async (
  imageUrl: string | URL
): Promise<Nullable<HTMLImageElement>> => {
  const imageFileObject = await getImageFileFromUrl(imageUrl);

  if (imageFileObject) {
    const imageElement = new Image();

    imageElement.src = URL.createObjectURL(imageFileObject);

    return imageElement;
  }

  return null;
};

export const getImageFileFromUrl = async (
  imageUrl: string | URL
): Promise<Nullable<File>> => {
  const imageData = await getImageDataFromUrl(imageUrl);

  if (imageData) {
    return convertBlobToFile(imageData);
  }

  return null;
};

export const getImageDataFromUrl = async (
  imageUrl: string | URL
): Promise<Nullable<Blob>> => {
  const fileAbsoluteUrl = imageUrl instanceof URL ? imageUrl.href : imageUrl;

  try {
    const response = await fetch(fileAbsoluteUrl);
    const fileBlobObject = await response.blob();

    if (fileBlobObject instanceof Blob) {
      return fileBlobObject;
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const getImageAsUint8ArrayFromUrl = async (
  imageUrl: string | URL
): Promise<Nullable<Uint8Array>> => {
  const imageData = await getImageDataFromUrl(imageUrl);

  if (!imageData) {
    return null;
  }

  const imageAsArrayBuffer = await imageData.arrayBuffer();
  const imageAsUInt8Array = new Uint8Array(imageAsArrayBuffer);

  return imageAsUInt8Array;
};
