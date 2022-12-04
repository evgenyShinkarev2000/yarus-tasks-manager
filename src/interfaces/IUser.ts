import { IId } from "./IId";

export interface IUser extends IId{
  name: string,
  surname: string
}

export interface IUserMock extends IUser, IId{
  projectId: string,
}