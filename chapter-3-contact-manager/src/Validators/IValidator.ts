export interface IValidator<T> {
  IsValid(input: T): void;
}
