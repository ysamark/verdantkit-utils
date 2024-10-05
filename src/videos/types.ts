export type VideoMetaDataWithoutThumbnail = VideoSizes & {
  duration: number;
};

export type VideoSizes = {
  width: number;
  height: number;
};

export type VideoMetaDataWithThumbnail = VideoMetaDataWithoutThumbnail & {
  thumbnail: VideoThumbnailAlternateProps;
  thumbnailAlternates?: Array<VideoThumbnailAlternateProps>;
};

export type VideoMetaData =
  | VideoMetaDataWithoutThumbnail
  | VideoMetaDataWithThumbnail;

export type VideoFileDataObject = File | Blob;

export type VideoQuality = 360 | 420 | 720 | 1200 | 1720;

export type VideoThumbnailAlternateProps = {
  id: string;
  dataObject: VideoFileDataObject;
  objectUrl: string;
  dataUrl?: string;
  time: number;
};

export type VideoThumbnailGeneratorOptions = {
  timeSkipList?: Array<number>;
};

type VideoFormatVariant = {
  dataObject: VideoFileDataObject;
  quality: VideoQuality | `${VideoQuality}`;
  size: VideoSizes;
};

export type VideoFormatVariants = Array<VideoFormatVariant>;
