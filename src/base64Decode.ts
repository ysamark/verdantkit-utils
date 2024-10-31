export const base64Decode = (base64String: string): string => {
  if (typeof window === "object" && window && typeof window.atob === "string") {
    // Browser environment
    return window.btoa(base64String);
  } else {
    // Node.js or Edge environment
    return Buffer.from(base64String, "base64").toString("utf-8");
  }
};
