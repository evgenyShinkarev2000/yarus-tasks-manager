import { ILocalStorageService } from "./services/local-storage/ILocalStorageService"
import { LocalStorageService } from "./services/local-storage/LocalStorageService"
import { IModalWindowService } from "./services/modal-window/IModalWindowService";
import { ModalWindowService } from "./services/modal-window/ModalWindowService";
import { IPermissionService } from "./services/permission/IPermissionService";
import { PermissionService } from "./services/permission/PermissionService";
import { IResourceManager } from "./services/resource-manager/IResourceManager";
import { ResourceManager } from "./services/resource-manager/ResourseManager";
export class Services{
    public readonly localStorageService: ILocalStorageService = new LocalStorageService();
    public readonly permissionService: IPermissionService = new PermissionService(this.localStorageService);
    public readonly resourceManager: IResourceManager = new ResourceManager();
    public readonly modalWindow: IModalWindowService = new ModalWindowService();
}