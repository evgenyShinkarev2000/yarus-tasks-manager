import { IFullTaskDTOHttpRequest, IFullTaskDTOHttpGetResponse, IFullTaskDTOHttpPostResponse, IFullTaskDTOHttpPutRequest } from "@/dto/http/FullTask";
import { ILoginDTOHttpRequest, ILoginDTOHttpResponseOk, ILoginDTOHttpResponseWrong } from "@/dto/http/Login";
import { IProjectsDTOHttpResponse } from "@/dto/http/Projects";
import { IShortTaskByProjectsDTOHttpResponse } from "@/dto/http/ShortTasksByProjects";
import { IStatusesDTOHttpResponse } from "@/dto/http/Statuses";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { IUser } from "@/interfaces/IUser";
import { TaskFull } from "@/view-models/TaskVM";
import { Axios } from "axios";
import { Observable } from "rxjs";

export interface IServerApi{
  getConfiguredAxios(): Axios,
  login(loginDto: ILoginDTOHttpRequest): Observable<IServerAnswer<ILoginDTOHttpResponseOk | ILoginDTOHttpResponseWrong>>;
  getProjects(): Observable<IServerAnswer<IProjectsDTOHttpResponse>>;
  getStatuses(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>;
  getPriorities(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>;
  updateToken(token: string): void;
  getTasksByProjectsId(projectsId: string[]): Observable<IServerAnswer<IShortTaskByProjectsDTOHttpResponse[]>>;
  getFullTask(projectId: string, taskId: string): Observable<IServerAnswer<IFullTaskDTOHttpGetResponse>>;
  postTask(fullTaskDto: IFullTaskDTOHttpRequest): Observable<IServerAnswer<IFullTaskDTOHttpPostResponse>>; 
  putTask(fullTaskDto: IFullTaskDTOHttpPutRequest, projectId: number | string, taskId: number | string): Observable<IServerAnswer<undefined>>;
  getUsersByProject(projectId: string): Observable<IServerAnswer<IUser[]>>;
}