export interface IServerAnswer<T>{
  isOk: boolean,
  message?: string,
  item?: T,
}