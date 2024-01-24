/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";

export const defineRoute = (route: string) => {
  return require(path.join(__dirname, "../routes", route)).default;
};
