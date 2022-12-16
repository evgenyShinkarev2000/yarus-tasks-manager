import { IIdPairName } from "@/interfaces/IIdPairName";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IUser } from "@/interfaces/IUser";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { BehaviorSubject, first, firstValueFrom, Observable, ReplaySubject } from "rxjs";
import { ILocalStorageService } from "../local-storage/ILocalStorageService";
import { IServerApi } from "../server-api/IServerApi";
import { IResourceManager } from "./IResourceManager";

export class ResourceManagerRemote implements IResourceManager
{
  private readonly _serverApi: IServerApi;
  private readonly _localStorageService: ILocalStorageService

  private _statuses$: ReplaySubject<IIdPairName[]> = new ReplaySubject<IIdPairName[]>(1);
  private _projects$: ReplaySubject<IIdPairName[]> = new ReplaySubject<IIdPairName[]>(1);
  private _priorities$: ReplaySubject<IIdPairName[]> = new ReplaySubject<IIdPairName[]>(1);

  public get statuses$(): Observable<IIdPairName[]>
  {
    return this._statuses$.pipe(first());
  }
  public get projects$(): Observable<IIdPairName[]>
  {
    return this._projects$.pipe(first());
  }
  public get priorities$(): Observable<IIdPairName[]>
  {
    return this._priorities$.pipe(first());
  }
  public get currentUser(): IUser
  {
    return this._localStorageService.user;
  }

  public readonly taskFilter: ReactiveFilter<ITaskShort> = new ReactiveFilter<ITaskShort>();

  constructor(serverApi: IServerApi, localStorageService: ILocalStorageService)
  {
    this._serverApi = serverApi;
    this._localStorageService = localStorageService;
  }

  public putTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>
  {
    throw new Error("Method not implemented.");
  }

  public addTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>
  {
    throw new Error("Method not implemented.");
  }



  /**Не реализовано на сервере
   * @returns пустой массив
   */
  public getContractorsByProjects$(ids: string[]): Observable<IUser[]>
  {
    throw new Error("Method not implemented.");
  }

  /**Не реализовано на сервере
 * @returns пустой массив
 */
  public getContractorsByProject$(projectId: string): Observable<IUser[]>
  {
    throw new Error("Method not implemented.");
  }

  /**@deprecated */
  public getPriorities(): Promise<IIdPairName[]>
  {
    return firstValueFrom(this._priorities$);
  }

  /**@deprecated */
  public getStatuses(): Promise<IIdPairName[]>
  {
    return firstValueFrom(this._statuses$);
  }

  /**@deprecated */
  public getProjects(): Promise<IIdPairName[]>
  {
    return firstValueFrom(this._projects$);
  }

  public getFullTaskById(id: string): Observable<ITaskFull>
  {
    throw new Error("Method not implemented.");
  }

  public initTasks(): void
  {
    this._serverApi.getPriorities().pipe(first())
      .subscribe(prioritiesDto => this._priorities$.next(prioritiesDto.item!.data));
    this._serverApi.getProjects().pipe(first())
      .subscribe(projectsDto =>
      {
        this._projects$.next(projectsDto.item!.data);

      });
    this._serverApi.getStatuses().pipe(first())
      .subscribe(statusesDto => this._statuses$.next(statusesDto.item!.data));
  }
}