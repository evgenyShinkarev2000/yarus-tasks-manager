import { ICheckedListItem } from "./ICheckedListItem";
import { ITaskShort } from "./ITaskShort";

export interface ITaskFull extends ITaskShort{
  projectId: string,
  authorId: string,
  contractorId: string,
  description: string,
  actualTime: number,
  accepted: boolean,
  compleatedAt: Date,
  checkList: ICheckedListItem[],
  projectName: string,
  priorityName: string,
  statusName: string,
}