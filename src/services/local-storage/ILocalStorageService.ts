import { Permission } from "../permission/PermissionEnum";

export interface ILocalStorageService{
    get token(): string | null;
    getPermissions(): Permission[] | null
    setPermissions(permissions: Permission[] | Set<Permission>): void;
    clear(): void
}