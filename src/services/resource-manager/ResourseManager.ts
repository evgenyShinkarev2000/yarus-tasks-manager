import { IIdPairName } from "@/interfaces/IIdPairName";
import { IServerAnswer } from "@/interfaces/IServeAnswer";
import { ITaskFull } from "@/interfaces/ITaskFull";
import { ITaskShort } from "@/interfaces/ITaskShort";
import { IUser, IUserMock } from "@/interfaces/IUser";
import { DateVM } from "@/view-models/DateVM";
import { ReactiveFilter } from "@/view-models/ReactiveFilter";
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, Subscriber } from "rxjs";
import { IResourceManager } from "./IResourceManager";

export class ResourceManager implements IResourceManager
{
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
    {
      id: "12", title: "Включить уведомления в телеграме", priorityId: "2", statusId: "1", projectId: "2", contractorId: "3",
      deadline: new DateVM(), contractorName: "Виктор", contractorSurname: "Ермолаев"
    },
    {
      id: "13", title: "Проснуться", priorityId: "3", statusId: "2", projectId: "1", contractorId: "4",
      deadline: new DateVM(), contractorName: "Джон", contractorSurname: "Сина"
    },
  ];

  private readonly _fullTasks: ITaskFull[] = [];
  private readonly _priorities: IIdPairName[] = [
    { id: "1", name: "Высокий приоритет" },
    { id: "2", name: "Средний приоритет" },
    { id: "3", name: "Низкий приоритет" }
  ]
  private readonly _projects: IIdPairName[] = [
    { id: "1", name: "Урфу" },
    { id: "2", name: "Ярус" }
  ];
  private readonly _statuses: IIdPairName[] = [
    { id: "1", name: "Создано" },
    { id: "2", name: "Принята в работу" },
    { id: "3", name: "Выполняется" },
    { id: "4", name: "Проверяется" },
    { id: "5", name: "Завершено" }
  ];
  private readonly _users: IUserMock[] = [
    { id: "3", name: "Виктор", surname: "Ермолаев", projectId: "2" },
    { id: "1", name: "Евгений", surname: "Шинкарев", projectId: "2" },
    { id: "2", name: "Игорь", surname: "Меркушев", projectId: "1" },
    { id: "4", name: "Джон", surname: "Сина", projectId: "1" },
  ]

  private _idNumber: number = 0;

  public readonly taskFilter = new ReactiveFilter<ITaskShort>();
  public readonly currentUser: IUser = { id: "1", name: "Евгений", surname: "Шинкарев" };

  public getProjects(): Promise<IIdPairName[]>
  {
    return this.helper(this._projects);
  }
  public get projects$(): Observable<IIdPairName[]>
  {
    const stream$ = new ReplaySubject<IIdPairName[]>(1);
    stream$.next(this._projects);

    return stream$;
  }

  public getContractorsByProjects$(ids: string[]): Observable<IUser[]>
  {
    const stream$ = new ReplaySubject<IUser[]>(1);
    const result: IUser[] = [];
    ids.forEach(id =>
    {
      const project = this._projects.find(p => p.id === id);
      if (!project)
      {
        throw new Error("Откуда взялся id?");
      }
      const users: IUser[] = this._users.filter(u => u.projectId === id);
      result.push(...users);
    });
    stream$.next(result);

    return stream$;
  }

  public getContractorsByProject$(projectId: string): Observable<IUser[]>
  {
    return this.getContractorsByProjects$([projectId]);
  }

  public getPriorities(): Promise<IIdPairName[]>
  {
    return this.helper(this._priorities);
  }

  public get priorities$(): Observable<IIdPairName[]>
  {
    return new BehaviorSubject<IIdPairName[]>(this._priorities);
  }

  public getStatuses(): Promise<IIdPairName[]>
  {
    return this.helper(this._statuses);
  }

  public initTasks(): void
  {
    this.taskFilter.minFiltersCount = 2;
    const tasksWithProjectName = this._shortTasks.map(t => {
        t.projectName = this._projects.find(p => p.id === t.projectId)?.name;
        return t;
    });
    this.taskFilter.setElementsToFilter(tasksWithProjectName);
  }

  public getFullTaskById(id: string): ReplaySubject<ITaskFull>
  {
    const fullTask$ = new ReplaySubject<ITaskFull>(1);
    let fullTask = this._fullTasks.find(t => t.id === id);
    if (fullTask){
      fullTask$.next(fullTask);
      
      return fullTask$;
    }
    
    fullTask = this._shortTasks.find(t => t.id === id) as unknown as ITaskFull;
    if (!fullTask)
    {
      throw new Error();
    }
    const projectName = this._projects.find(p => p.id === fullTask!.projectId)?.name;
    if (!projectName)
    {
      throw new Error();
    }
    fullTask.projectName = projectName;
    const priorityName = this._priorities.find(p => p.id === fullTask!.priorityId)?.name;
    if (!priorityName)
    {
      throw new Error();
    }
    fullTask.priorityName = priorityName;
    const statusName = this._statuses.find(s => s.id === fullTask!.statusId)?.name;
    if (!statusName)
    {
      throw new Error();
    }
    fullTask.statusName = statusName;
    fullTask.checkList = [
      { id: "1", isClosed: true, name: "этап 1" },
      { id: "2", isClosed: false, name: "этап 2" },
      { id: "3", isClosed: false, name: "этап 3" }
    ];
    fullTask.deadline = fullTask.deadline ?? new DateVM();
    setTimeout(() =>
    {
      fullTask$.next(fullTask!);
    }, 1500);

    return fullTask$;
  }

  public putTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>
  {
    let index = this._fullTasks.findIndex(t => t.id === fullTask.id);
    if (index >= 0){
      this._fullTasks[index] = fullTask;
    }
    else{
      this._fullTasks.push(fullTask);
    }
    index = this._shortTasks.findIndex(t => t.id === fullTask.id);
    if (index >= 0){
      this._shortTasks[index] = fullTask;
    }
    else{
      throw new Error();
    }

    this.taskFilter.setElementsToFilter(this._shortTasks);

    const stream$ = new BehaviorSubject<IServerAnswer<ITaskFull>>({isOk: true, item: fullTask});
    stream$.complete();

    return stream$;
  }

  addTask(fullTask: ITaskFull): Observable<IServerAnswer<ITaskFull>>
  {
    fullTask.statusId = "1";
    fullTask.statusName = "Создано";
    fullTask.id = "from serve answer " + this._idNumber;
    this._idNumber += 1;
    this._fullTasks.push(fullTask);
    this._shortTasks.push(fullTask);
    this.taskFilter.setElementsToFilter(this._shortTasks);
    const stream$ = new BehaviorSubject<IServerAnswer<ITaskFull>>({isOk: true, item: fullTask});
    stream$.complete();

    return stream$;
  }

  private helper<T>(data: T, delay: number = 1000): Promise<T>
  {
    let resolve: (data: T) => void;
    const promise: Promise<T> = new Promise((res, rej) =>
    {
      resolve = res;
    });
    setTimeout(() =>
    {
      resolve(data);
    }, delay);

    return promise;
  }
}