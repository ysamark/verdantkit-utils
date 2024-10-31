/**
 * Helper function to encode a Uint8Array to a Base64 string.
 * Works in both browser and Node.js environments.
 */
export const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  if (
    typeof window === "object" &&
    window &&
    typeof window.btoa === "function"
  ) {
    // Browser environment
    return btoa(String.fromCharCode(...bytes));
  } else {
    // Node.js or Edge environment
    return Buffer.from(bytes).toString("base64");
  }
};
