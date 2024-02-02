import { Folder } from "@prisma/client";

export interface FileModel {
  id: number;

  fileName: string;

  filePath: string;

  folder: Folder; // Ensure this line is present
}
