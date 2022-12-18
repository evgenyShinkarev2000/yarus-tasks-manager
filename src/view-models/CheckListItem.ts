import { IStageDTOHttp } from "@/dto/http/Stage";
import { ICheckedListItem } from "@/interfaces/ICheckedListItem";

export class CheckListItem implements ICheckedListItem{
  isClosed: boolean;
  name: string;
  id: number;

  public static fromDto(stage: IStageDTOHttp): ICheckedListItem{
    return {
      id: stage.id!,
      isClosed: stage.is_ready === 1,
      name: stage.description,
    } as ICheckedListItem;
  }

  public static toDto(item: ICheckedListItem): IStageDTOHttp{
    return {
      description: item.name,
      id: item.id as number,
      is_ready: item.isClosed ? 1 : 0,
    }
  }

}