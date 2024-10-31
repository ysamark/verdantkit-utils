import pako from "pako";

import { base64ToUint8Array } from "./base64ToUint8Array";
import { uint8ArrayToBase64 } from "./uint8ArrayToBase64";

/**
 * Decompress a compressed Base64 string back to its original form.
 * @param compressedBase64 - The compressed Base64 encoded input string.
 * @returns Original decompressed Base64 string.
 */
export const decompressBase64 = (compressedBase64: string): string => {
  const compressedBytes = base64ToUint8Array(compressedBase64); // Decode Base64 to Uint8Array
  const decompressedBytes = pako.inflate(compressedBytes); // Decompress using DEFLATE
  return uint8ArrayToBase64(decompressedBytes); // Encode decompressed bytes to Base64
};
