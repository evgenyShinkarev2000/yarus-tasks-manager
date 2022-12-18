import { IStageDTOHttp } from "./Stage"

export interface IFullTaskDTOHttpRequest
{
  project_id: number,
  priority_id: number,
  name: string,
  stages: string[],
  description: string,
  deadline: string,
}

export interface IFullTaskDTOHttpPutRequest{
  project_id?: number,
  priority_id?: number,
  status_id?: number,
  name?: string,
  deadline?: string,
  description?: string
  actual_time?: number,
  stages: IStageDTOHttp[],
}

export interface IFullTaskDTOHttpPostResponse
{
  task: {
    project_id: number,
    id: number,
    contractor_id: number,
    priority_id: number,
    status_id: number,
    deadline: string,
    description: string,
    actual_time: number,
  },
  stages: IStageDTOHttp[],
}

export interface IFullTaskDTOHttpGetResponse
{
  project_name: string,
  project_id: number,
  task_id: number,
  task_name: string,
  contractor_id: number,
  contractor_name: string
  contractor_surname: string,
  priority_id: number,
  priority_name: string,
  status_id: number,
  status_name: string,
  deadline: string,
  description: string,
  actual_time: number,
  stages: IStageDTOHttp[],
}