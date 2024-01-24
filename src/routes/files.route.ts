import { app } from "../http/server";
import path from "path";
import { streamToBuffer } from "../utils/streamBuffer";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../lib/cloudflare";

app.post("/uploads", async (request) => {
  const data = await request.file();
  const file = data?.file;
  const uploadFolder = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  if (!file) {
    return;
  }
  const fileBuffer = await streamToBuffer(file);
  const fileName = path.join(uploadFolder, data.filename);
  fs.writeFileSync(fileName, fileBuffer as string);
  const filePath = path.join(__dirname, "../../uploads", data.filename);
  const params = {
    Bucket: "storage-api",
    Key: data.filename,
    Body: fs.createReadStream(filePath),
    ContentType: data.mimetype,
  };
  const uploadCommand = new PutObjectCommand(params);
  await r2.send(uploadCommand);
});
