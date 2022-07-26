import { IPersonState } from '../Types';

export interface IValidation {
  Validate(state: IPersonState, errors: string[]): void;
}
