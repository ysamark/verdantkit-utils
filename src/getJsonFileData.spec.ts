import { describe, expect, it } from "vitest";

import { getJsonFileDataFromUrl } from "./getJsonFileData";

describe("Test getJsonFileDataFromUrl util", () => {
  it("should get json file data given the file url", async () => {
    const jsonFileData = await getJsonFileDataFromUrl(
      "http://localhost/img/package.json"
    );

    expect(jsonFileData).toMatchObject({
      name: "tsconfig-paths-to-module-name-mapper",
      version: "1.5.0",
      main: "dist/index.js",
      license: "MIT",
      repository:
        "git@github.com:ysamark/tsconfig-paths-to-module-name-mapper.git",
      author: "Agostinho Sam'l <agostinhosaml832@gmail.com>",
      displayName: "Verdant kit utils",
      homepage:
        "https://github.com/ysamark/tsconfig-paths-to-module-name-mapper#readme",
      scripts: {
        prebuild:
          "tsc --rootDir src --outDir dist --esModuleInterop --declaration --emitDeclarationOnly",
        build:
          'babel src --config-file "./babel.config.js" --extensions ".js,.ts" --out-dir dist --copy-files --no-copy-ignored',
        test: "cross-env NODE_ENV=test vitest",
        lint: "eslint --ext .js src/",
        commit: "cz",
      },
      bugs: {
        url: "https://github.com/ysamark/tsconfig-paths-to-module-name-mapper/issues",
        email: "hatatsu@ysamark.ao",
      },
      links: [
        {
          label: "Ysamark",
          url: "https://www.ysamark.ao",
        },
        {
          label: "Ysamark On Facebook",
          url: "https://www.facebook.com/ysamark.ao",
        },
        {
          label: "Ysamark On X",
          url: "https://www.x.com/@ysamark.ao",
        },
        {
          label: "Ysamark On Github",
          url: "https://www.github.com/ysamark",
        },
      ],
      files: ["dist", "README.md", "package.json"],
      devDependencies: {
        "@babel/cli": "^7.25.6",
        "@babel/core": "^7.25.2",
        "@babel/node": "^7.25.0",
        "@babel/plugin-proposal-class-properties": "^7.18.6",
        "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
        "@babel/preset-env": "^7.25.4",
        "@babel/preset-es2017": "^7.0.0-beta.53",
        "@babel/preset-typescript": "^7.24.7",
        "@eslint/js": "^9.10.0",
        "@types/node": "^22.5.4",
        "cross-env": "^7.0.3",
        eslint: "^9.10.0",
        globals: "^15.9.0",
        "ts-node-dev": "^2.0.0",
        "tsconfig-paths": "^4.2.0",
        typescript: "latest",
        "typescript-eslint": "^8.5.0",
        vitest: "^2.1.0",
      },
    });
  });
});
