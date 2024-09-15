export type CookieDate =
  | Date
  | number
  | `${number}h`
  | `${number}m`
  | `${number}s`
  | `${number}d`
  | `${number}M`
  | `${number}y`;

export type CookieOptions = {
  "Max-Age"?: CookieDate;
  Path?: string;
  Secure?: string;
  SameSite?: "Lax";
};
