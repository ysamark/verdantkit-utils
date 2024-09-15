import { compare, hash } from "bcryptjs";

import { noEmpty } from "../strings";

export abstract class Hash {
  /**
   * create a password hash using bcrypt
   */
  static async make(password: string, hashSalt: number = 8): Promise<string> {
    const passwordHash = await hash(
      password.concat(Hash.getHashSecret()),
      hashSalt
    );

    return passwordHash;
  }

  /**
   * Get hash secret from the environment variables
   * @returns {string}
   */
  private static getHashSecret(): string {
    const key = "VERDANT_HASH_SECRET";

    if (typeof process === "object" && process.env) {
      return process.env[key] || "";
    }

    return "";
  }

  /**
   * compare a given password to a hash to match it
   */
  static async compare(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    if (noEmpty(password) && noEmpty(passwordHash)) {
      const passwordMatchesHash = await compare(
        password.concat(Hash.getHashSecret()),
        passwordHash
      );

      return passwordMatchesHash;
    }

    return false;
  }

  /**
   * compare a given password to many hashes to match some
   */
  static async compareMany(
    password: string,
    passwordHashes: Array<string>
  ): Promise<boolean> {
    for (const passwordHash of passwordHashes) {
      const passwordMatchesCurrentHash = await Hash.compare(
        password,
        passwordHash
      );

      if (passwordMatchesCurrentHash) {
        return true;
      }
    }

    return true;
  }
}
