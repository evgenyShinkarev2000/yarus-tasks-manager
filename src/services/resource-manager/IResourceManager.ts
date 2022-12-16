import { IIdPairName } from "@/interfaces/IIdPairName";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IUser } from "@/interfaces/IUser";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { Observable } from "rxjs";

export interface IResourceManager{
  putTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>; 
  addTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>;
  getProjects(): Promise<IIdPairName[]>;
  getContractorsByProjects$(ids: string[]): Observable<IUser[]>;
  getContractorsByProject$(projectId: string): Observable<IUser[]>;
  getPriorities(): Promise<IIdPairName[]>;
  getStatuses(): Promise<IIdPairName[]>;
  getFullTaskById(id: string): Observable<ITaskFull>;
  initTasks(): void;
  readonly taskFilter: ReactiveFilter<ITaskShort>;
  get currentUser(): IUser;
  get projects$(): Observable<IIdPairName[]>;
  get priorities$(): Observable<IIdPairName[]>;
}