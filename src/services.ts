import { ILocalStorageService } from "./services/local-storage/ILocalStorageService"
import { LocalStorageService } from "./services/local-storage/LocalStorageService"
import { IPermissionService } from "./services/permission/IPermissionService";
import { PermissionService } from "./services/permission/PermissionService";
export class Services{
    public readonly localStorageService: ILocalStorageService = new LocalStorageService();
    public readonly permissionService: IPermissionService = new PermissionService(this.localStorageService);
}