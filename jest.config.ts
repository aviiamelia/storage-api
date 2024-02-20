import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/infra/db/mock/singleton.ts"],
};

export default config;
