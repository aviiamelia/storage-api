import { FolderModel } from "./folderModel";

export interface UserModel {
  id: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  folders?: FolderModel[];
  permissions?: Permissions[];
}
