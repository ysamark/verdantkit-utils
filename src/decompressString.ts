import { base64Decode } from "./base64Decode";
import { decompressBase64 } from "./decompressBase64";

export const decompressString = (compressedString: string): string => {
  return base64Decode(decompressBase64(compressedString));
};
