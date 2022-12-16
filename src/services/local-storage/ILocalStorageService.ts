import { IUser } from "@/interfaces/IUser";
import { Permission } from "../permission/PermissionEnum";

export interface ILocalStorageService{
    get token(): string | null;
    get user(): IUser;
    set user(user: IUser);
    getPermissions(): Permission[] | null
    setPermissions(permissions: Permission[] | Set<Permission>): void;
    clear(): void
    setToken(token: string): void;
}