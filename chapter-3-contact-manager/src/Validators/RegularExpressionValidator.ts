import { IValidator } from './IValidator';
import { StringOrNull } from '../Types';

export class RegularExpressionValidator implements IValidator<StringOrNull> {
  private regex: RegExp;
  constructor(expression: string) {
    this.regex = new RegExp(expression);
  }
  IsValid(input: StringOrNull): boolean {
    if (!input) {
      return false;
    }
    return this.regex.test(input);
  }
}
