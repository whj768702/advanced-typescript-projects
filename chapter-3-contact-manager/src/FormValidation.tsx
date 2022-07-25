import { IPersonState, StringOrNull } from './Types';

interface IValidator<T> {
  IsValid(input: T): void;
}

export class MinLengthValidator implements IValidator<StringOrNull> {
  private minLength: number;

  constructor(minLength: number) {
    this.minLength = minLength;
  }

  IsValid(input: StringOrNull): boolean {
    if (!input) {
      return false;
    }
    return input.length >= this.minLength;
  }
}

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

export interface IValidation {
  Validate(state: IPersonState, errors: string[]): void;
}

export class AddressValidation implements IValidation {
  private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(5);

  private readonly zipCodeValidator: RegularExpressionValidator = new RegularExpressionValidator(
    '^[0-9]{5}(?:-[0-9]{4})$'
  );

  Validate(state: IPersonState, errors: string[]) {
    if (!this.minLengthValidator.IsValid(state.Address1)) {
      errors.push('Address line 1 must be greater  than 5 characters');
    }
    if (!this.minLengthValidator.IsValid(state.Town)) {
      errors.push('Town must be greater  than 5 characters');
    }
    if (!this.minLengthValidator.IsValid(state.County)) {
      errors.push('County must be greater  than 5 characters');
    }
    if (!this.zipCodeValidator.IsValid(state.Postcode)) {
      errors.push('The postal/zip code is invalid');
    }
  }
}

export class PersonValidation implements IValidation {
  private readonly firstNameValidator: MinLengthValidator = new MinLengthValidator(1);
  private readonly lastNameValidator: MinLengthValidator = new MinLengthValidator(2);

  Validate(state: IPersonState, errors: string[]) {
    if (!this.firstNameValidator.IsValid(state.FirstName)) {
      errors.push('First name must be greater than 1 character');
    }
    if (!this.lastNameValidator.IsValid(state.LastName)) {
      errors.push('Last name must be greater than 2 characters');
    }
  }
}

export class PhoneValidation implements IValidation {
  private readonly regexValidator: RegularExpressionValidator = new RegularExpressionValidator(
    '^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'
  );
  private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(1);

  Validate(state: IPersonState, errors: string[]) {
    if (!this.minLengthValidator.IsValid(state.PhoneNumber)) {
      errors.push('Phone number must be greater than 1 character');
    } else if (!this.regexValidator.IsValid(state.PhoneNumber)) {
      errors.push('Phone number must be in the format xxx-xxx-xxxx');
    }
  }
}
