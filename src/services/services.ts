import { IServices } from "./IServices";
import { ILocalStorageService } from "./local-storage/ILocalStorageService";
import { LocalStorageService } from "./local-storage/LocalStorageService";
import { IModalWindowService } from "./modal-window/IModalWindowService";
import { ModalWindowService } from "./modal-window/ModalWindowService";
import { IPermissionService } from "./permission/IPermissionService";
import { PermissionService } from "./permission/PermissionService";
import { IResourceManager } from "./resource-manager/IResourceManager";
import { ResourceManager } from "./resource-manager/ResourseManager";
export class Services implements IServices{
    public readonly localStorageService: ILocalStorageService = new LocalStorageService();
    public readonly permissionService: IPermissionService = new PermissionService(this.localStorageService);
    public readonly resourceManager: IResourceManager = new ResourceManager();
    public readonly modalWindow: IModalWindowService = new ModalWindowService();
}