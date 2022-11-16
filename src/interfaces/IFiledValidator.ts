export interface IFieldValidator{
  isError: boolean,
  errorText: string,
  validate(s: string): void,
  isActive: boolean
}