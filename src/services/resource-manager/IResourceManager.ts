import { IIdPairName } from "@/interfaces/IIdPairName";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IUser } from "@/interfaces/IUser";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { Observable } from "rxjs";

export interface IResourceManager{
  putTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>, 
  addTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>,
  getProjects(): Promise<IIdPairName[]>,
  projects$: Observable<IIdPairName[]>,
  getContractorsByProjects$(ids: string[]): Observable<IUser[]>,
  getContractorsByProject$(projectId: string): Observable<IUser[]>,
  getPriorities(): Promise<IIdPairName[]>,
  priorities$: Observable<IIdPairName[]>,
  getStatuses(): Promise<IIdPairName[]>,
  getFullTaskById(id: string): Observable<ITaskFull>,
  initTasks(): void,
  taskFilter: ReactiveFilter<ITaskShort>,
  currentUser: IUser 
}