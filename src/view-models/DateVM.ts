export class DateVM{
  public readonly date: Date = new Date();

  public get dateStringOnly(): string{
    return `${this.date.getDate()}.${this.date.getMonth()}.${this.date.getFullYear()}`
  }
}