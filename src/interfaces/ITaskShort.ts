import { DateVM } from "@/view-models/DateVM";

export interface ITaskShort{
  id: string,
  title: string,
  deadline: DateVM,
  contractorName: string,
  contractorSurname: string,
  statusId: string,
  priorityId: string,
}