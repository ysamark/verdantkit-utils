import { base64Encode } from "./base64Encode";
import { compressBase64 } from "./compressBase64";

export const compressString = (string: string): string => {
  return compressBase64(base64Encode(string));
};
