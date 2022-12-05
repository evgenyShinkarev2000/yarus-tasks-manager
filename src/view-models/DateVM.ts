export class DateVM{
  public readonly date: Date;

  constructor(date: Date = new Date()) {
    this.date = date;
  }

  public get dateStringOnly(): string{
    return `${this.date.getDate()}.${this.date.getMonth()}.${this.date.getFullYear()}`
  }

  public getCopy(): DateVM{
    return new DateVM(new Date(this.date.getTime()));
  }
}