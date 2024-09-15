import { convertImageFile, ImageFileArgument } from './convertImageFile'

export const convertImageFileToJpeg = async (imageFile: ImageFileArgument) => {
  return convertImageFile(imageFile, 'jpg')
}
