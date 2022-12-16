import { ILocalStorageService } from "./local-storage/ILocalStorageService";
import { IModalWindowService } from "./modal-window/IModalWindowService";
import { IPermissionService } from "./permission/IPermissionService";
import { IResourceManager } from "./resource-manager/IResourceManager";

export interface IServices{
  localStorageService: ILocalStorageService,
  permissionService: IPermissionService,
   resourceManager: IResourceManager,
   modalWindow: IModalWindowService,
}