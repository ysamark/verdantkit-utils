import { range } from "..";
import { generateVideoThumbnail } from "./generateVideoThumbnail";
import { VideoThumbnailAlternateProps } from "./types";

export const generateVideoThumbnails = async (
  videoDataObject: File,
  quantity: number = 6
): Promise<Array<VideoThumbnailAlternateProps>> => {
  const capturedTimes: Array<number> = [];

  return new Promise(async (resolve) => {
    const generatedVideoThumbnails = await Promise.all(
      range(1, quantity).map(async () => {
        const videoThumbnailData = await generateVideoThumbnail(
          videoDataObject,
          {
            timeSkipList: capturedTimes,
          }
        );

        capturedTimes.push(videoThumbnailData.time);

        return videoThumbnailData;
      })
    );

    resolve(generatedVideoThumbnails);
  });
};
