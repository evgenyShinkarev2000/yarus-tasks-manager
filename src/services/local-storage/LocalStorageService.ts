import { IUser } from "@/interfaces/IUser";
import { Permission } from "../permission/PermissionEnum";
import {ILocalStorageService} from "./ILocalStorageService";

export class LocalStorageService implements ILocalStorageService{
    private _token: string;
    public get token(): string | null {
        return localStorage.getItem('token')?.trim() ?? null;
    }
    public get user(): IUser {
        const userString = localStorage.getItem("user");
        if (!userString){
            throw new Error("Сервис авторизации должен был устаность IUser перед работой остальных сервисов");
        } 

        const keys: {[key in keyof IUser]: any} = {
            id: 0,
            name: 1,
            surname: 2
        };
        const user = JSON.parse(userString) as IUser;
        for(const key of Object.keys(keys)){
            if (!(key in user)){
                throw new Error("Сервис авторизации должен был устаность IUser перед работой остальных сервисов");
            }
        }

        return user;
    }
    public set user(user: IUser){
        if (!user){
            throw new Error("undifined");
        }

        localStorage.setItem("user", JSON.stringify(user));
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

    public setToken(token: string): void
    {
        if (!token){
            throw new Error("Попытка записать в локальное хранилище пустой токен");
        }
        localStorage.setItem("token", token);
    }

    
}