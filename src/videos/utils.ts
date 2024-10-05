export const isVideoFile = (videoDataObject: any): boolean => {
  const re = /^(video\/(.*))$/i;

  return Boolean(
    videoDataObject instanceof File && re.test(videoDataObject.type)
  );
};

export const loadedVideoMetadata = (
  videoElement: HTMLVideoElement
): boolean => {
  return videoElement.videoWidth >= 1;
};
