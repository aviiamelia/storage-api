/* eslint-disable @typescript-eslint/no-explicit-any */
export const streamToBuffer = async (stream: any) => {
  return new Promise((resolve, reject) => {
    const chunks: any = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (error: any) => reject(error));
  });
};
