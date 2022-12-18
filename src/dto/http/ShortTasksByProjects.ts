import { ISHortTaskDTOHttpResponse } from "./ShortTask";

export interface IShortTaskByProjectsDTOHttpResponse
{
  idProject: string,
  nameProject: string,
  tasks: ISHortTaskDTOHttpResponse[],
}