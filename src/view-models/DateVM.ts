export class DateVM extends Date{
  public get dateStringOnly(): string{
    return `${this.getDate()}.${this.getMonth()}.${this.getFullYear()}`
  }
}