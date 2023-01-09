import { Observable, Subject } from "rxjs";
import { App, Component, VNode } from "vue";

export interface IModalWindowService{
  closeSignal$: Subject<void>;
  showComponent$: Subject<VNode>;
}