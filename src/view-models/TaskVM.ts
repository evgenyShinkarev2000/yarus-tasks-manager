import { IFullTaskDTOHttpRequest, IFullTaskDTOHttpGetResponse } from "@/dto/http/FullTask";
import { ICheckedListItem } from "@/interfaces/ICheckedListItem";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { CheckListItem } from "./CheckListItem";
import { DateVM } from "./DateVM";

export class TaskFull implements ITaskFull{
  projectId: string;
  authorId: string;
  contractorId: string;
  description: string;
  actualTime: number;
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
    Object.assign(this, fullTask);
  }

  public getCopy(): ITaskFull{
    const checkListCopy: ICheckedListItem[] = !this.checkList ? [] : this.checkList.map(item => {
      return Object.assign({}, item);
    });

    const fullTaskCopy = Object.assign({}, this);
    fullTaskCopy.checkList = checkListCopy;
    fullTaskCopy.deadline = this.deadline?.getCopy() ?? new DateVM();

    return fullTaskCopy;
  }

  public static toDto(fullTask: ITaskFull): IFullTaskDTOHttpRequest{
    return {
      deadline: fullTask.deadline.toSqlDate(),
      description: fullTask.description,
      name: fullTask.title,
      contractor_id: parseInt(fullTask.contractorId),
      priority_id: parseInt(fullTask.priorityId),
      project_id: parseInt(fullTask.projectId),
      stages: fullTask.checkList.map(i => CheckListItem.toDto(i)),
    } as IFullTaskDTOHttpRequest;
  } 

  public static fromDto(dto: IFullTaskDTOHttpGetResponse): ITaskFull{
    return {
      contractorName: dto.contractor_name,
      contractorSurname: dto.contractor_surname,
      id: dto.task_id.toString(),
      deadline: new DateVM(new Date(dto.deadline)),
      priorityId: dto.priority_id.toString(),
      statusId: dto.status_id.toString(),
      title: dto.task_name,
      projectId: dto.project_id.toString(),
      authorId: dto.contractor_id.toString(),
      contractorId: dto.contractor_id.toString(),
      description: dto.description,
      actualTime: parseFloat(dto.actual_time ?? "0"),
      accepted: true,
      compleatedAt: new Date(),
      checkList: dto.stages.map(stage => CheckListItem.fromDto(stage)),
      projectName: dto.project_name,
      priorityName: dto.priority_name,
      statusName: dto.status_name,
    } 
  }
}