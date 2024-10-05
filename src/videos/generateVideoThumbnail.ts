import { generateRandomId, rand, randFromRange, range } from "..";
import {
  VideoThumbnailAlternateProps,
  VideoThumbnailGeneratorOptions,
} from "./types";
import { isVideoFile, loadedVideoMetadata } from "./utils";

export const generateVideoThumbnail = async (
  videoDataObject: File,
  options: VideoThumbnailGeneratorOptions = {}
): Promise<VideoThumbnailAlternateProps> => {
  if (!isVideoFile(videoDataObject)) {
    throw new TypeError(
      "generateVideoThumbnail: first argument must be a valid video file object"
    );
  }

  const videoElement: HTMLVideoElement = document.createElement("video");

  Object.assign(videoElement, {
    muted: true,
    controls: true,
    playbackRate: 2,
    src: URL.createObjectURL(videoDataObject),
  });

  return new Promise((resolve, reject) => {
    const videoPlayStartHandler = (): void => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const getVideoMetaData = () => {
        const [videoWidth, videoHeight, videoDuration] = [
          videoElement.videoWidth,
          videoElement.videoHeight,
          videoElement.duration,
        ];

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const videoTimeRange = range(
          videoDuration / rand(2, 10),
          videoDuration
        );

        const videoThumbnailCaptureTime = randFromRange(
          videoTimeRange.filter((videoTime) => {
            if (
              options &&
              typeof options === "object" &&
              options.timeSkipList instanceof Array
            ) {
              return options.timeSkipList.indexOf(videoTime) < 0;
            }

            return true;
          })
        );

        if (!ctx) {
          return reject(new Error("Could not generate video thumbnail."));
        }

        videoElement.currentTime = videoThumbnailCaptureTime;

        setTimeout(() => {
          ctx.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

          canvas.toBlob((blob) => {
            const thumbnailDataUrl = canvas.toDataURL();
            const thumbnailDataObject = !blob ? undefined : blob;

            if (!thumbnailDataObject) {
              return reject(new Error("Could not generate video thumbnail."));
            }

            resolve({
              dataObject: thumbnailDataObject,
              objectUrl: URL.createObjectURL(thumbnailDataObject),
              dataUrl: thumbnailDataUrl,
              time: videoThumbnailCaptureTime,
              id: generateRandomId(),
            });
          });
        }, 300);
      };

      if (!loadedVideoMetadata(videoElement)) {
        return videoElement.addEventListener(
          "loadedmetadata",
          getVideoMetaData
        );
      }

      getVideoMetaData();
    };

    videoElement.play().then(videoPlayStartHandler);
  });
};
