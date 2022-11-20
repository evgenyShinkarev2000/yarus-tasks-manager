import { DateVM } from "@/view-models/DateVM";

export interface ITaskShort{
  id: string,
  title: string,
  deadline: DateVM,
  contractorName: string,
  contractorSurname: string,
  contractorId: string,
  statusId: string,
  priorityId: string,
  projectId: string
}