import { IIdPairName } from "@/interfaces/IIdPairName";
import { ITaskShort } from "@/interfaces/ITaskShort";

export interface IResourceManager{
  getShortTasks(projectIds: string[], onlyMyTasks: boolean): Promise<ITaskShort[]>,
  getProjects(): Promise<IIdPairName[]>,
  getPriorities(): Promise<IIdPairName[]>,
  getStatuses(): Promise<IIdPairName[]>
}