import { Observable, Subject } from "rxjs";

export interface IModalWindowService{
  closeSignal$: Subject<void>;
}