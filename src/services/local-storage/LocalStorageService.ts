import { Permission } from "../permission/PermissionEnum";
import {ILocalStorageService} from "./ILocalStorageService";

export class LocalStorageService implements ILocalStorageService{
    private _token: string;
    get token(): string | null {
        return localStorage.getItem('token')?.trim() ?? null;
    }

    public getPermissions(): Permission[] | null{
        const value = localStorage.getItem('permissions');
        if (value == null){
            return null;
        }
        
        let result: string[];
        try{
           result = JSON.parse(value);
        }
        catch{
            return null;
        }

        return Array.isArray(result) ? result as unknown as Permission[] : null;
    }

    public setPermissions(permissions: Permission[] | Set<Permission>): void{
        if (!permissions){
            throw new Error();
        }

        const stringify = JSON.stringify(permissions);
        localStorage.setItem('permissions', stringify);
    }

    public clear(): void{
        localStorage.clear();
    }

    
}