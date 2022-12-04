import { IDropDownListOption } from "@/interfaces/IDropDownListOption";
import { IIdPairName } from "@/interfaces/IIdPairName";
import { BehaviorSubject, Observable } from "rxjs";

export interface IDropDownListItem<T> extends IDropDownListOption
{
  item: T,
}

export class DropDownListProvider<T>{
  private readonly _selected$: BehaviorSubject<IDropDownListItem<T> | null> = new BehaviorSubject<IDropDownListItem<T> | null>(null);
  private readonly _idNameSelector: (element: T) => IIdPairName;
  private _items$: BehaviorSubject<IDropDownListItem<T>[]> = new BehaviorSubject<IDropDownListItem<T>[]>([]);
  /**
   * always has value
   */
  public get items$(): Observable<ReadonlyArray<IDropDownListItem<T>>>
  {
    return this._items$;
  }
  public get items(): ReadonlyArray<IDropDownListItem<T>>{
    return this._items$.value;
  }
  /**
  * always has value
  */
  public get selected$(): Observable<Readonly<IDropDownListItem<T>> | null>
  {
    return this._selected$;
  }

  public constructor(idNameSelector: (element: T) => IIdPairName, elements: T[] = [], selectedIndex: number = 0)
  {
    this._idNameSelector = idNameSelector;
    this.setItems(elements, selectedIndex);
  }

  public setItems(elements: T[] = [], selectedIndex: number = 0): void
  {
    if (selectedIndex < 0 && selectedIndex >= elements.length && selectedIndex % 1 !== 0)
    {
      throw new Error();
    }
    const items: IDropDownListItem<T>[] = elements.map((e, i) =>
    {
      return { item: e, index: i, isSelected: i === selectedIndex, idPairName: this._idNameSelector(e) };
    });
    this._items$.next(items);
    this.updateSelected(selectedIndex);
  }

  public changeSelected(newSelectedIndex: number): void
  {
    if (newSelectedIndex < 0 && newSelectedIndex >= this._items$.value.length && newSelectedIndex % 1 !== 0)
    {
      throw new Error();
    }
    this.updateSelected(newSelectedIndex);
  }

  public findItemById(id: string | undefined): IDropDownListItem<T> | null{
    if (!id){
      return null;
    }
    const item = this._items$.value.find(item => item.idPairName.id === id);

    return item ? item : null;
  }

  private updateSelected(newSelectedIndex: number = 0): void
  {
    if (newSelectedIndex < 0 && newSelectedIndex % 1 !== 0
      || this._items$.value.length > 0 && newSelectedIndex >= this._items$.value.length)
    {
      throw new Error();
    }
    if (this._items$.value.length === 0){
      this._selected$.next(null);
      return;
    }
    this._items$.value.forEach(item => item.isSelected = false);
    this._items$.value[newSelectedIndex].isSelected = true;
    this._selected$.next(this._items$.value[newSelectedIndex]);
  }
}