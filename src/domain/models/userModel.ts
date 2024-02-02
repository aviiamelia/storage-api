import { FolderModel } from "./folderModel";

export interface UserModel {
  id: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  upDatedAt: string;
  folders?: FolderModel[];
  permissions?: Permissions[];
}
