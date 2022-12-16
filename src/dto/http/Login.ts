export interface ILoginDTOHttpRequest{
    login: string,
    password: string,
}

export interface ILoginDTOHttpResponseOk{
  id: string,
  name: string,
  surname: string,
  token_type: string,
  token: string,
  expires_at: string,
}

export interface ILoginDTOHttpResponseWrong{
  message: string,
  errors: object,
}