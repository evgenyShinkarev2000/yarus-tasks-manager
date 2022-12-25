import { IFullTaskDTOHttpRequest, IFullTaskDTOHttpGetResponse, IFullTaskDTOHttpPostResponse, IFullTaskDTOHttpPutRequest } from "@/dto/http/FullTask";
import { ILoginDTOHttpRequest, ILoginDTOHttpResponseOk, ILoginDTOHttpResponseWrong } from "@/dto/http/Login";
import { IProjectsDTOHttpResponse } from "@/dto/http/Projects";
import { IShortTaskByProjectsDTOHttpResponse } from "@/dto/http/ShortTasksByProjects";
import { IStageDTOHttp } from "@/dto/http/Stage";
import { IStatusesDTOHttpResponse } from "@/dto/http/Statuses";
import { ErrorInterceptor } from "@/interceptors/ErrorInterceptor";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { TaskFull } from "@/view-models/TaskVM";
import axios, { Axios, AxiosResponse } from "axios";
import { catchError, first, from, map, Observable, Subject, take } from "rxjs";
import { ILocalStorageService } from "../local-storage/ILocalStorageService";
import { IServerApi } from "./IServerApi";

export class LocalServerApi implements IServerApi
{
  private readonly _localStorageService: ILocalStorageService;
  private readonly _axios: Axios;
  private token: string;

  constructor(localStorageService: ILocalStorageService)
  {
    this._localStorageService = localStorageService;
    this.token = this._localStorageService.token ?? "";

    this._axios = axios.create({
      baseURL: "http://trellolaravel/public/api/",
      headers: {
        "Accept": "application/json",
        "Authorization": this.token,
      },
    });
    this._axios.interceptors.response.use(r => r, new ErrorInterceptor().getResponseReject());
  }

  public getConfiguredAxios(): Axios
  {
    return this._axios;
  }

  public updateToken(token: string): void
  {
    this.token = token;
    //@ts-ignore
    this._axios.defaults.headers["Authorization"] = token;
  }

  public login(loginDto: ILoginDTOHttpRequest): Observable<IServerAnswer<ILoginDTOHttpResponseOk | ILoginDTOHttpResponseWrong>>
  {
    const response$ = new Subject<IServerAnswer<ILoginDTOHttpResponseOk | ILoginDTOHttpResponseWrong>>();
    this._axios.post<ILoginDTOHttpResponseOk | ILoginDTOHttpResponseWrong>("auth/login", loginDto)
      .then(response =>
      {
        const data = response.data as ILoginDTOHttpResponseOk;
        response$.next({
          item: data,
          status: "ok",
        });
        if (response.status !== 200)
        {
          console.log("странный статус при login");
          console.log(response);
        }
      }).catch(e =>
      {
        if (e.response?.status === 422)
        {
          const data = e.response.data as ILoginDTOHttpResponseWrong;
          response$.next({
            status: "authenticationError",
            item: data,
          });
        }
      }).finally(() => response$.complete());

    return response$;
  }

  public getProjects(): Observable<IServerAnswer<IProjectsDTOHttpResponse>>
  {
    return this.getHelper("projects");
  }

  public getStatuses(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>
  {
    return this.getHelper("statuses");
  }

  public getPriorities(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>
  {
    return this.getHelper("priorities");
  }

  public getTasksByProjectsId(projectsId: string[]): Observable<IServerAnswer<IShortTaskByProjectsDTOHttpResponse[]>>
  {
    const promise = this._axios.get("tasks", {
      params: {
        "projectsId[]": projectsId,
      }
    })

    return this.streamHelper<IShortTaskByProjectsDTOHttpResponse[]>(promise);
  }

  public getFullTask(projectId: string, taskId: string): Observable<IServerAnswer<IFullTaskDTOHttpGetResponse>>
  {
    return this.getHelper(`tasks/${projectId}/${taskId}`);
  }

  public postTask(fullTaskDto: IFullTaskDTOHttpRequest): Observable<IServerAnswer<IFullTaskDTOHttpPostResponse>>
  {
    // при создании должно быть только описание, иначе ошибка валидации;
    fullTaskDto.stages = fullTaskDto.stages?.map(s => {
      return (s as IStageDTOHttp).description as string;
    });

    return this.streamHelper(this._axios.post("tasks", fullTaskDto));
  }

  public putTask(fullTaskDto: IFullTaskDTOHttpPutRequest, projectId: number | string, taskId: number | string): Observable<IServerAnswer<undefined>>
  {
    return this.streamHelper(this._axios.put(`tasks/${projectId}/${taskId}`, fullTaskDto));
  }

  private getHelper<T>(route: string): Observable<IServerAnswer<T>>
  {
    return this.streamHelper(this._axios.get<T>(route));
  }

  private streamHelper<T>(promise: Promise<any>): Observable<IServerAnswer<T>>
  {
    return from(promise).pipe(
      take(1),
      map((response: AxiosResponse) =>
      {
        const data = response.data as T;
        return {
          status: "ok",
          item: data,
        } as IServerAnswer<T>
      }),
      catchError(e => {
        debugger;
         throw e;
      })
    )
  }
}