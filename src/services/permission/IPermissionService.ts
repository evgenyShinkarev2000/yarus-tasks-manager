import { Observable } from "rxjs";
import { RouteLocation } from "vue-router";

export interface IPermissionService{
    authenticate(login: string, password: string): Observable<boolean>;
    exit(): void;
    hasPermissions(route: RouteLocation): boolean
    isAuthenticated(route: RouteLocation): boolean;
}