import { Subject } from "rxjs/internal/Subject";
import { App, Component, VNode } from "vue";
import { IModalWindowService } from "./IModalWindowService";

export class ModalWindowService implements IModalWindowService{
  public readonly closeSignal$: Subject<void> = new Subject<void>();
  public showComponent$: Subject<VNode> = new Subject<VNode>();
}