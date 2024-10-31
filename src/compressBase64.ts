import pako from "pako";

import { base64ToUint8Array } from "./base64ToUint8Array";
import { uint8ArrayToBase64 } from "./uint8ArrayToBase64";

/**
 * Compress a Base64 string without loss using DEFLATE.
 * @param inputBase64 - The Base64 encoded input string to compress.
 * @returns Compressed Base64 string.
 */
export const compressBase64 = (inputBase64: string): string => {
  const inputBytes = base64ToUint8Array(inputBase64); // Decode Base64 to Uint8Array
  const compressedBytes = pako.deflate(inputBytes); // Compress using DEFLATE
  return uint8ArrayToBase64(compressedBytes); // Encode compressed bytes to Base64
};
