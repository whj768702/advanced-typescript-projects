import { IValidation } from './IValidation';
import { MinLengthValidator } from '../Validators/MinLengthValidator';
import { IPersonState } from '../Types';

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
