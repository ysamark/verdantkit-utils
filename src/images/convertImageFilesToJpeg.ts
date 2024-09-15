import { ImageFileArgument } from './convertImageFile'
import { convertImageFileToJpeg } from './convertImageFileToJpeg'

export const convertImageFilesToJpeg = async (
  imageFiles: Array<ImageFileArgument>
) => {
  return await Promise.all(
    imageFiles.map(imageFile => convertImageFileToJpeg(imageFile))
  )
}
