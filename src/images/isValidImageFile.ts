import { filterValidImageFiles } from "../filterValidImageFiles";

export const isValidImageFile = async (
  imageFile: any
): Promise<false | File> => {
  const [validImageFile] = await filterValidImageFiles([imageFile]);

  if (validImageFile) {
    return validImageFile;
  }

  return false;
};
