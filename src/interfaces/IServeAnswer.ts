import { ServerResponseStatus } from "@/types/ServeResponseStatus";

export interface IServerAnswer<T>{
  status: ServerResponseStatus,
  message?: string,
  item?: T,
}