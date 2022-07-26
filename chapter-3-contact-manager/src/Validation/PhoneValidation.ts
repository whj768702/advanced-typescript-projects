import { IPersonState } from '../Types';
import { IValidation } from '../Validation/IValidation';
import { RegularExpressionValidator } from '../Validators/RegularExpressionValidator';
import { MinLengthValidator } from '../Validators/MinLengthValidator';

export class PhoneValidation implements IValidation {
  private readonly regexValidator: RegularExpressionValidator = new RegularExpressionValidator(
    `^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-. ]?(?:[0-9]{3})[-. ]?(?:[0-9]{4})$`
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
