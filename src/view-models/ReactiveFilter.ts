import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";

export class ReactiveFilter<T>{
  private _minFiltersCount: number = 0;
  private readonly _updateFilteredElementsSignal$ = new Subject<void>();
  private readonly _filtersMap: {[key: symbol]: (elementToValid: T) => boolean} = {};
  public readonly filteredElements$: BehaviorSubject<T[]>;
  private _elementsToFilter: T[] = [];
  public get minFiltersCount() {
    return this._minFiltersCount;
  }
  public set minFiltersCount(num: number){
    num = num >= 0 ? num : 0;
    this._minFiltersCount = num;
  }

  constructor() {
    this.filteredElements$ = new BehaviorSubject<T[]>([]);
    this._updateFilteredElementsSignal$.subscribe(() => {
      const filtered = this.getFilteredElements()
      this.filteredElements$.next(filtered);
    });
  }

  public getFilterSetter$(filterName: string = ""): Subject<(elementToValid: T) => boolean>{
    const emiter = new Subject<(elementToValid: T) => boolean>();
    const key = Symbol(filterName);
    emiter.subscribe(filter => {
      debugger;
      this._filtersMap[key] = filter;
      this._updateFilteredElementsSignal$.next();
    });

    return emiter;
  }

  public setElementsToFilter(elements$: Observable<T[]>): void{
    elements$.subscribe(elements => {
      this._elementsToFilter = elements;
      const t = this._updateFilteredElementsSignal$;
      t.next();
    });
  }

  private getFilteredElements(): T[]{
    const filters = Object.getOwnPropertySymbols(this._filtersMap).map(symb => this._filtersMap[symb]);
    if (filters.length < this.minFiltersCount){
      return [];
    }

    return this._elementsToFilter.filter(element => {
      let isValid = true;
      for(const filter of filters){
        if(!filter(element)){
          isValid = false;
          break;
        }
      }

      return isValid;
    })
  }
}