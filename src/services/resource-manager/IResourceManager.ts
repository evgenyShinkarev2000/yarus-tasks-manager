import { IIdPairName } from "@/interfaces/IIdPairName";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { Observable } from "rxjs";

export interface IResourceManager{
  getProjects(): Promise<IIdPairName[]>,
  getPriorities(): Promise<IIdPairName[]>,
  getStatuses(): Promise<IIdPairName[]>,
  getFullTaskById(id: string): Observable<ITaskFull>,
  initTasks(): void,
  taskFilter: ReactiveFilter<ITaskShort>,
  currentUser: IIdPairName 
}