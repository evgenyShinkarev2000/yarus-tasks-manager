import { IServices } from "./IServices";
import { ILocalStorageService } from "./local-storage/ILocalStorageService";
import { LocalStorageService } from "./local-storage/LocalStorageService";
import { IModalWindowService } from "./modal-window/IModalWindowService";
import { ModalWindowService } from "./modal-window/ModalWindowService";
import { IPermissionService } from "./permission/IPermissionService";
import { PermissionRemoteService } from "./permission/PermissionRemoteService";
import { IResourceManager } from "./resource-manager/IResourceManager";
import { ResourceManagerRemote } from "./resource-manager/ResourceMangaerRemote";
import { IServerApi } from "./server-api/IServerApi";
import { LocalServerApi } from "./server-api/LocalServerApi";

export class RemoveServices implements IServices{
  localStorageService: ILocalStorageService = new LocalStorageService();
  serverApi: IServerApi = new LocalServerApi(this.localStorageService)
  permissionService: IPermissionService = new PermissionRemoteService(this.localStorageService, this.serverApi);
  resourceManager: IResourceManager = new ResourceManagerRemote(this.serverApi, this.localStorageService);
  modalWindow: IModalWindowService = new ModalWindowService();
}