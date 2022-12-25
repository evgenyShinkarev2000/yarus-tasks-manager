export class DateVM{
  public readonly date: Date;

  constructor(date: Date = new Date()) {
    this.date = date;
  }

  public get dateStringOnly(): string{
    return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`
  }

  public getCopy(): DateVM{
    return new DateVM(new Date(this.date.getTime()));
  }

  public toSqlDate(): string{
    return DateVM.toSqlDate(this.date);
  }

  public static toSqlDate(date: Date): string{
    const pad = function(num: number) { return ('00'+num).slice(-2) };
    return date.getFullYear()         + '-' +
    pad(date.getMonth() + 1)  + '-' +
    pad(date.getDate())       + ' ' +
    pad(date.getHours())      + ':' +
    pad(date.getMinutes())    + ':' +
    pad(date.getSeconds());
  }
}