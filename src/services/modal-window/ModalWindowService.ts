import { Subject } from "rxjs/internal/Subject";
import { IModalWindowService } from "./IModalWindowService";

export class ModalWindowService implements IModalWindowService{
  public readonly closeSignal$: Subject<void> = new Subject<void>();
}