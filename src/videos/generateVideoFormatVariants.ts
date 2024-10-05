import { getVideoMetaData } from ".";
import { VideoFormatVariants } from "./types";

export const generateVideoFormatVariants = async (
  videoDataObject: File
): Promise<VideoFormatVariants> => {
  const { height, width } = await getVideoMetaData(videoDataObject);

  const videoFormatVariants: VideoFormatVariants = [
    {
      dataObject: videoDataObject,
      quality: 720,
      size: {
        height,
        width,
      },
    },
  ];

  // TODO: Generate other video format variants and return all

  return new Promise((resolve) => {
    setTimeout(() => resolve(videoFormatVariants), 3000);
  });
};
