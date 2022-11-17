import { ICheckedListItem } from "./ICheckedListItem";
import { ITaskShort } from "./ITaskShort";

export interface ITaskFull extends ITaskShort{
  projectId: string,
  authorId: string,
  contractorId: string,
  description: string,
  actualTime: Date,
  accepted: boolean,
  compleatedAt: Date,
  checkList: ICheckedListItem[]
}