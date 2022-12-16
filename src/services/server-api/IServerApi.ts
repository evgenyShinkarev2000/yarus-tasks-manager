import { ILoginDTOHttpRequest, ILoginDTOHttpResponseOk, ILoginDTOHttpResponseWrong } from "@/dto/http/Login";
import { IProjectsDTOHttpResponse } from "@/dto/http/Projects";
import { IStatusesDTOHttpResponse } from "@/dto/http/Statuses";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { Axios } from "axios";
import { Observable } from "rxjs";

export interface IServerApi{
  getConfiguredAxios(): Axios,
  login(loginDto: ILoginDTOHttpRequest): Observable<IServerAnswer<ILoginDTOHttpResponseOk | ILoginDTOHttpResponseWrong>>;
  getProjects(): Observable<IServerAnswer<IProjectsDTOHttpResponse>>;
  getStatuses(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>;
  getPriorities(): Observable<IServerAnswer<IStatusesDTOHttpResponse>>;
  updateToken(token: string): void;
  // getTasksByProjectsId(): Observable<IServerAnswer<>>
}