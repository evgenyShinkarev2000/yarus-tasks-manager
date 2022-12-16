import { AxiosError, AxiosResponse } from "axios";

export class ErrorInterceptor
{
  private responseReject(response: AxiosError): Promise<AxiosResponse>
  {
    if (!response?.response)
    {
      alert("Проблемы с подключением к сети. Изменения не были сохранены.");
      console.log(response);
    }
    const status = response.response!.status;
    if (status >= 500)
    {
      alert("Сервис недоступен");
    }
    else
    {
      switch (status)
      {
        case 404: {
          console.log("Обращение по недопустимому адресу", response);
          throw new Error("Описание выше");
        }
        case 403: {
          alert("У вас недостаточно прав для совершения этого действия");
          console.log("Или где-то баг");
          break;
        }
      }
    }

    return Promise.reject(response);
  }

  public getResponseReject(): (response: AxiosError) => Promise<AxiosResponse>
  {
    return (r: AxiosError) => this.responseReject(r);
  }
}