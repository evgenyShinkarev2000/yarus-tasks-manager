import router from "@/router";
import { BehaviorSubject, Observable } from "rxjs";
import { RouteLocation } from "vue-router";
import { ILocalStorageService } from "../local-storage/ILocalStorageService";
import { IPermissionService } from "./IPermissionService";
import { Permission } from "./PermissionEnum";

export class PermissionService implements IPermissionService {
    private readonly _userPermissions: Set<Permission>;
    private readonly _localStorageService: ILocalStorageService;
    get userPermissions(): ReadonlySet<Permission> {
        return this._userPermissions;
    }

    constructor(localStorageService: ILocalStorageService) {
        this._localStorageService = localStorageService;
        this._userPermissions = new Set(localStorageService.getPermissions() ?? []);
    }

    authenticate(login: string, password: string): Observable<boolean> {
        this._localStorageService.setPermissions([Permission.Authenticated]);
        const stream$ = new Observable<boolean>(s => {
            s.next(true);
            this._userPermissions.add(Permission.Authenticated);
            this._localStorageService.user = {
                id: "1",
                name: "Евгений",
                surname: "Шинкарев",
              };
            s.complete();
        })

        return stream$;
    }

    exit(): void {
        this._localStorageService.clear();
        this._userPermissions.clear();
    }

    hasPermissions(route: RouteLocation): boolean {
        const requiredPermissions = this.getRequiredPermissions(route);

        for (const requiredPermission of requiredPermissions) {
            if (!this._userPermissions.has(requiredPermission)) {
                return false;
            }
        }

        return true;
    }

    isAuthenticated(route: RouteLocation): boolean {
        return this.getRequiredPermissions(route).indexOf(Permission.Authenticated) < 0
            || this._userPermissions.has(Permission.Authenticated);
    }

    private getRequiredPermissions(route: RouteLocation): Permission[] {
        const requiredPermissions = route.meta.permissions as Permission[];

        return requiredPermissions ?? [];
    }
}