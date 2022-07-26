export interface IRecordState {
  IsActive: boolean;
}

export class RecordState implements IRecordState {
  IsActive: boolean = false;
}
