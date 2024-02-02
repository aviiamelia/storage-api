import { FolderModel } from "./folderModel";
import { UserModel } from "./userModel";

export enum PermissionType {
  READER = "reader",
  WRITER = "writer",
  FULL = "full",
}

export interface PermissionModel {
  id: number;

  user: UserModel;

  folder: FolderModel;

  permissionType: PermissionType;
}
