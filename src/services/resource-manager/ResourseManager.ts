import { IIdPairName } from "@/interfaces/IIdPairName";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IResourceManager } from "./IResourceManager";

export class ResourceManager implements IResourceManager{
  getShortTasks(projectIds: string[], onlyMyTasks: boolean): Promise<ITaskShort[]> {
    const promise: Promise<ITaskShort[]> = new Promise(() => [{}]);
    setTimeout(() => Promise.resolve(promise), 1000);
    
    return promise;
  }
  getProjects(): Promise<IIdPairName[]> {
    let resolve: (data: IIdPairName[] ) => void;
    const promise: Promise<IIdPairName[]> = new Promise((res, rej) => {
      resolve = res;
    });

    setTimeout(() => {
      resolve([{id: "1", name: "urfu project"}, {id: "2", name: "yarus project"}]);

    }, 1000);

    return promise;
  }
  getPriorities(): Promise<IIdPairName[]> {
    throw new Error("Method not implemented.");
  }
  getStatuses(): Promise<IIdPairName[]> {
    throw new Error("Method not implemented.");
  }

}