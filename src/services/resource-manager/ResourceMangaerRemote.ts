import { IFullTaskDTOHttpRequest as IFullTaskDTOHttpRequest, IFullTaskDTOHttpGetResponse, IFullTaskDTOHttpPutRequest } from "@/dto/http/FullTask";
import { ISHortTaskDTOHttpResponse } from "@/dto/http/ShortTask";
import { IStageDTOHttp } from "@/dto/http/Stage";
import { IIdPairName } from "@/interfaces/IIdPairName";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IUser } from "@/interfaces/IUser";
import { DateVM } from "@/view-models/DateVM";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { ShortTask as ShortTaskVM } from "@/view-models/ShortTasks";
import { TaskFull } from "@/view-models/TaskVM";
import { BehaviorSubject, combineLatestWith, concatMap, first, firstValueFrom, map, Observable, pipe, ReplaySubject, tap } from "rxjs";
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
    return this._statuses$.pipe(
      first(),
      map(statuses => {
        return statuses.sort((a, b) => {
          return a.id.localeCompare(b.id);
        })
      }));
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

  public putTask(fullTaskOld: ITaskFull, fullTaskNew: ITaskFull): Observable<ITaskFull>
  {
    debugger;
    const stages: IStageDTOHttp[] = [];
    fullTaskNew.checkList.forEach(item => {
      if(!item.id){
        stages.push({description: item.name, is_ready: item.isClosed ? 1 : 0})
      }
      else{
        stages.push({description: item.name, is_ready: item.isClosed ? 1 : 0, id: item.id as number})
      }
    })
    fullTaskOld.checkList.forEach(item => {
      if (!fullTaskNew.checkList.find(i => i.id === item.id)){
        stages.push({id: item.id as number});
      }
    })

    const taskDto: IFullTaskDTOHttpPutRequest = {
      actual_time: fullTaskNew.actualTime ?? 0,
      deadline: fullTaskNew.deadline.toSqlDate(),
      description: fullTaskNew.description,
      name: fullTaskNew.title === fullTaskOld.title ? undefined : fullTaskNew.title,
      priority_id: parseInt(fullTaskNew.priorityId),
      project_id: parseInt(fullTaskNew.projectId),
      status_id: parseInt(fullTaskNew.statusId),
      stages,
    }
    return this._serverApi.putTask(taskDto, fullTaskOld.projectId, fullTaskOld.id).pipe(
      first(),
      tap(() => {
        const updatedTasks = this.taskFilter.elementsToFilter.filter(e => e.id !== fullTaskNew.id).concat(fullTaskNew);
        this.taskFilter.setElementsToFilter(updatedTasks);
      }),
      
      map(undef => fullTaskNew));
  }

  public addTask(fullTask: ITaskFull): Observable<ITaskFull>
  {
    const taskDto: IFullTaskDTOHttpRequest = TaskFull.toDto(fullTask);

    return this._serverApi.postTask(taskDto).pipe(
      first(),
      combineLatestWith(this.statuses$),
      map(([serverAnswer, statuses]) => {
        const taskResponse = serverAnswer.item!.task;
        fullTask.id = taskResponse.id.toString();
        fullTask.statusId = taskResponse.status_id.toString();
        const statuseName = statuses.filter(s => s.id === fullTask.statusId)[0].name;
        fullTask.statusName = statuseName;
        this.taskFilter.setElementsToFilter(this.taskFilter.elementsToFilter.concat(fullTask));

        return fullTask;
      }),
    )
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

  public getFullTaskById(projectId: string, taskId: string): Observable<ITaskFull>
  {
    return this._serverApi.getFullTask(projectId, taskId).pipe(
      first(),
      map(fullTaskDto =>
      {
        return TaskFull.fromDto(fullTaskDto.item as IFullTaskDTOHttpGetResponse);
      })
    )
  }

  public initTasks(): void
  {
    this._serverApi.getPriorities().pipe(first())
      .subscribe(prioritiesDto => this._priorities$.next(prioritiesDto.item!.data.map(p =>
      {
        return { id: p.id.toString(), name: p.name }
      })));

    this._serverApi.getProjects().pipe(first())
      .subscribe(projectsDto =>
      {
        this._projects$.next(projectsDto.item!.data.map(p =>
        {
          return { id: p.id.toString(), name: p.name };
        }));
        const projectIds = projectsDto.item!.data.map(idPairName => idPairName.id.toString());
        this._serverApi.getTasksByProjectsId(projectIds).pipe(first())
          .subscribe(shortTasksByProjects =>
          {
            const allSHortTasksDto: ISHortTaskDTOHttpResponse[] = [];
            for (const tasksByProject of shortTasksByProjects.item ?? [])
            {
              allSHortTasksDto.push(...tasksByProject.tasks);
            }
            this.taskFilter.setElementsToFilter(allSHortTasksDto.map(dto => ShortTaskVM.fromDto(dto)));
          })
      });

    this._serverApi.getStatuses().pipe(first())
      .subscribe(statusesDto => this._statuses$.next(statusesDto.item!.data.map(p =>
      {
        return { id: p.id.toString(), name: p.name };
      })));
  }
}