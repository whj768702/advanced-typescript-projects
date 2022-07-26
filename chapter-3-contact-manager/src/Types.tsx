import { RecordState } from './RecordSate';

export type StringOrNull = string | null;

export interface IPersonState {
  FirstName: string;
  LastName: string;
  Address1: string;
  Address2: string;
  Town: string;
  County: string;
  PhoneNumber: string;
  Postcode: string;
  DateOfBirth: StringOrNull;
  PersonId: string;
}

export interface IProps {
  DefaultState: IPersonState;
}

export type PersonRecord = RecordState & IPersonState;
