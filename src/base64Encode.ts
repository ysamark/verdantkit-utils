export const base64Encode = (string: string): string => {
  if (
    typeof window === "object" &&
    window &&
    typeof window.btoa === "function"
  ) {
    // Browser environment
    return window.btoa(string);
  } else {
    // Node.js or Edge environment
    return Buffer.from(string).toString("base64");
  }
};
