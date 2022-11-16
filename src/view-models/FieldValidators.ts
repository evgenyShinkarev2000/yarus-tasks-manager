import { IFieldValidator } from "@/interfaces/IFiledValidator";

export class Custom implements IFieldValidator {
  private readonly _validateFn: (s: string) => boolean;
  private readonly _errorText: string;
  private _isError: boolean = false;
  public isActive: boolean = true;
  constructor(validateFn: (s: string) => boolean, errorText: string) {
    this._validateFn = validateFn;
    this._errorText = errorText;
  }
  public validate(s: string): void {
    this._isError = this._validateFn(s);
  }
  public get isError(): boolean {
    return this.isActive && this._isError;
  }
  public get errorText(): string {
    return this._errorText;
  }
}

export class Empty extends Custom {
  constructor() {
    super((s: string) => !s || s.trim().length == 0, "Поле не должно быть пустым"); 
  }
}