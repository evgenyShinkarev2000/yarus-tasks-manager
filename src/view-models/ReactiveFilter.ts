import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";

export class ReactiveFilter<T>{
  private readonly _filtersMap: {[key: symbol]: (elementToValid: T) => boolean} = {};
  private _minFiltersCount: number = 0;
  private _elementsToFilter: T[] = [];
  public readonly filteredElements$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public get minFiltersCount() {
    return this._minFiltersCount;
  }
  public set minFiltersCount(num: number){
    num = num > 0 ? num : 0;
    this._minFiltersCount = num;
  }

  public getFilterSetter(filterName: string = ""): (filter: (elementToValid: T) => boolean) => void{
    const key = Symbol(filterName);
    const setter = (filter: (elementToValid: T) => boolean) => {
      this._filtersMap[key] = filter;
      this.updateFilteredElements();
    }

    return setter;
  }

  public setElementsToFilter(elements: T[]): void{
      this._elementsToFilter = elements;
      this.updateFilteredElements();
  }

  private updateFilteredElements(): void{
    this.filteredElements$.next(this.getFilteredElements());
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