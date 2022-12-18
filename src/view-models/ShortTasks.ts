import { ISHortTaskDTOHttpResponse } from "@/dto/http/ShortTask";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { DateVM } from "./DateVM";

export class ShortTask implements ITaskShort
{
  id: string;
  title: string;
  deadline: DateVM;
  contractorName: string;
  contractorSurname: string;
  contractorId: string;
  statusId: string;
  priorityId: string;
  projectId: string;
  projectName?: string | undefined;

  public static fromDto(shortTaskDto: ISHortTaskDTOHttpResponse): ITaskShort
  {
    return {
      id: shortTaskDto.task_id.toString(),

      title: shortTaskDto.task_name,

      deadline: new DateVM(new Date(shortTaskDto.deadline)),

      contractorName: shortTaskDto.contractor_name,

      contractorSurname: shortTaskDto.contractor_surname,

      contractorId: shortTaskDto.contractor_id.toString(),
      statusId: shortTaskDto.status_id.toString(),

      priorityId: shortTaskDto.priority_id.toString(),
      projectId: shortTaskDto.project_id.toString(),
      projectName: shortTaskDto.project_name,
    } as ITaskShort;
  }

}

//6
//7
//6
//5
//4
//1