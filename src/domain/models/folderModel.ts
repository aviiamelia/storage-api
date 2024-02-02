import { PermissionModel } from "./PermissionModel";
import { UserModel } from "./userModel";

export interface FolderModel {
  id: string;

  folderName: string;
  user: UserModel;

  files: File[];

  parentFolder: FolderModel;

  childFolders: FolderModel[];

  permissions: PermissionModel[];
}
