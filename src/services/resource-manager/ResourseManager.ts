import { IIdPairName } from "@/interfaces/IIdPairName";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { DateVM } from "@/view-models/DateVM";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { Observable, Subject, Subscriber } from "rxjs";
import { IResourceManager } from "./IResourceManager";

export class ResourceManager implements IResourceManager {
  private readonly _shortTasks: ITaskShort[] = [
    {
      id: "1", title: "Начать учиться", priorityId: "1", statusId: "1", projectId: "2", contractorId: "1",
      deadline: new DateVM(), contractorName: "Евгений", contractorSurname: "Шинкарев"
    },
    {
      id: "2", title: "Вынести мусор", priorityId: "2", statusId: "2", projectId: "2", contractorId: "1",
      deadline: new DateVM(), contractorName: "Евгений", contractorSurname: "Шинкарев"
    },
    {
      id: "3", title: "Убраться", priorityId: "3", statusId: "3", projectId: "2", contractorId: "1",
      deadline: new DateVM(), contractorName: "Евгений", contractorSurname: "Шинкарев"
    },
    {
      id: "4", title: "Получить посылку", priorityId: "1", statusId: "4", projectId: "2", contractorId: "1",
      deadline: new DateVM(), contractorName: "Евгений", contractorSurname: "Шинкарев"
    },
    {
      id: "5", title: "Лечь спать в 23:00", priorityId: "1", statusId: "5", projectId: "2", contractorId: "1",
      deadline: new DateVM(), contractorName: "Евгений", contractorSurname: "Шинкарев"
    },
    {
      id: "6", title: "Лечь спать", priorityId: "2", statusId: "5", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
    {
      id: "7", title: "Сменить имя в вк", priorityId: "3", statusId: "1", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
    {
      id: "8", title: "Написать тест", priorityId: "1", statusId: "2", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
    {
      id: "9", title: "Востановить режим сна", priorityId: "2", statusId: "3", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
    {
      id: "10", title: "Разобраться с rxjs", priorityId: "3", statusId: "4", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
    {
      id: "11", title: "Заменить Promise на Observable", priorityId: "1", statusId: "5", projectId: "1", contractorId: "2",
      deadline: new DateVM(), contractorName: "Игорь", contractorSurname: "Меркушев"
    },
  ];

  public readonly taskFilter = new ReactiveFilter<ITaskShort>();
  public readonly currentUserId: string = "1";

  public getProjects(): Promise<IIdPairName[]> {
    return this.helper([
      { id: "1", name: "Урфу" },
      { id: "2", name: "Ярус" }
    ]);
  }
  public getPriorities(): Promise<IIdPairName[]> {
    return this.helper([
      { id: "1", name: "Низкий приоритет" },
      { id: "2", name: "Средний приоритет" },
      { id: "3", name: "Высокий приоритет" }
    ]);
  }
  public getStatuses(): Promise<IIdPairName[]> {
    return this.helper([
      { id: "1", name: "Создано" },
      { id: "2", name: "Принята в работу" },
      { id: "3", name: "Выполняется" },
      { id: "4", name: "Проверяется" },
      { id: "5", name: "Завершено" }
    ]);
  }
  public initTasks(): void {
    this.taskFilter.minFiltersCount = 2;
    this.taskFilter.setElementsToFilter(new Observable(subscriber => {
      subscriber.next(this._shortTasks);
    }));
  }

  private helper<T>(data: T, delay: number = 1000): Promise<T> {
    let resolve: (data: T) => void;
    const promise: Promise<T> = new Promise((res, rej) => {
      resolve = res;
    });
    setTimeout(() => {
      resolve(data);
    }, delay);

    return promise;
  }
}