export const base64ToUint8Array = (base64: string): Uint8Array => {
  if (
    typeof window === "object" &&
    window &&
    typeof window.atob === "function"
  ) {
    // Browser environment
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  } else {
    // Node.js or Edge environment
    return Uint8Array.from(Buffer.from(base64, "base64"));
  }
};
