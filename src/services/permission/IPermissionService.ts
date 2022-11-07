import { RouteLocation } from "vue-router";

export interface IPermissionService{
    authenticate(login: string, password: string): Promise<boolean>;
    exit(): void;
    hasPermissions(route: RouteLocation): boolean
    isAuthenticated(route: RouteLocation): boolean;
}