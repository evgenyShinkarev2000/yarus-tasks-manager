import { ILoginDTOHttpResponseOk } from "@/dto/http/Login";
import { IUser } from "@/interfaces/IUser";
import router from "@/router";
import { catchError, map, Observable, take } from "rxjs";
import { RouteLocation } from "vue-router";
import { ILocalStorageService } from "../local-storage/ILocalStorageService";
import { IServerApi } from "../server-api/IServerApi";
import { IPermissionService } from "./IPermissionService";
import { Permission } from "./PermissionEnum";

export class PermissionRemoteService implements IPermissionService
{
  private readonly _localStorageService: ILocalStorageService;
  private readonly _serverApi: IServerApi;
  private readonly _userPermissions: Set<Permission>;

  constructor(localStorageService: ILocalStorageService, serverApi: IServerApi)
  {
    this._localStorageService = localStorageService;
    this._serverApi = serverApi;
    this._userPermissions = new Set(localStorageService.getPermissions() ?? []);
  }

  public isAuthenticated(route: RouteLocation): boolean
  {
    return this.getRequiredPermissions(route).indexOf(Permission.Authenticated) < 0
      || this._userPermissions.has(Permission.Authenticated);
  }

  public authenticate(login: string, password: string): Observable<boolean>
  {
    const stream$ = this._serverApi.login({ login: login, password: password }).pipe(
      take(1),
      map(serverAnswer =>
      {
        if (serverAnswer.status === "ok"){
          this._localStorageService.setPermissions([Permission.Authenticated]);
          this._userPermissions.add(Permission.Authenticated);
          const okResponse = (serverAnswer.item as ILoginDTOHttpResponseOk)
          this._localStorageService.user = okResponse;
          const token = okResponse.token_type + " " + okResponse.token;
          this._serverApi.updateToken(token);
          this._localStorageService.setToken(token);

          return true;
        }
        
        return false;
      }));


    return stream$;
  }

  public exit(): void
  {
    this._localStorageService.clear();
    this._userPermissions.clear();
  }

  public hasPermissions(route: RouteLocation): boolean
  {
    const requiredPermissions = this.getRequiredPermissions(route);

    for (const requiredPermission of requiredPermissions)
    {
      if (!this._userPermissions.has(requiredPermission))
      {
        return false;
      }
    }

    return true;
  }

  private getRequiredPermissions(route: RouteLocation): Permission[]
  {
    const requiredPermissions = route.meta.permissions as Permission[];

    return requiredPermissions ?? [];
  }

}