import { ICheckedListItem } from "@/interfaces/ICheckedListItem";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { DateVM } from "./DateVM";

export class TaskVM implements ITaskFull{
  projectId: string;
  authorId: string;
  contractorId: string;
  description: string;
  actualTime: Date;
  accepted: boolean;
  compleatedAt: Date;
  checkList: ICheckedListItem[] = [];
  projectName: string;
  priorityName: string;
  statusName: string;
  id: string;
  title: string;
  deadline: DateVM;
  contractorName: string;
  contractorSurname: string;
  statusId: string;
  priorityId: string;

  constructor(fullTask: ITaskFull) {
    debugger;
    Object.assign(this, fullTask);
  }

  public getCopy(): ITaskFull{
    debugger;
    const checkListCopy: ICheckedListItem[] = !this.checkList ? [] : this.checkList.map(item => {
      return Object.assign({}, item);
    });

    const fullTaskCopy = Object.assign({}, this);
    fullTaskCopy.checkList = checkListCopy;
    fullTaskCopy.deadline = this.deadline?.getCopy() ?? new DateVM();

    return fullTaskCopy;
  }

}