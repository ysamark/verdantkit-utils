import { generateVideoThumbnails } from ".";
import { generateVideoThumbnail } from "./generateVideoThumbnail";
import { VideoMetaData } from "./types";
import { isVideoFile, loadedVideoMetadata } from "./utils";

export const getVideoMetaData = async (
  videoDataObject: File
): Promise<VideoMetaData> => {
  if (!isVideoFile(videoDataObject)) {
    throw new TypeError(
      "getVideoMetaData: first argument must be a valid video file object"
    );
  }

  const videoElement: HTMLVideoElement = document.createElement("video");

  Object.assign(videoElement, {
    muted: true,
    controls: true,
    playbackRate: 2,
    src: URL.createObjectURL(videoDataObject),
  });

  return new Promise(async (resolve) => {
    const videoThumbnail = await generateVideoThumbnail(videoDataObject);
    const videoThumbnailAlternates = await generateVideoThumbnails(
      videoDataObject
    );

    const getVideoMetaData = () => {
      resolve({
        duration: videoElement.duration,
        thumbnail: videoThumbnail,
        height: videoElement.videoHeight,
        width: videoElement.videoWidth,
        thumbnailAlternates: videoThumbnailAlternates,
      });
    };

    if (!loadedVideoMetadata(videoElement)) {
      return videoElement.addEventListener("loadedmetadata", getVideoMetaData);
    }

    getVideoMetaData();
  });
};
