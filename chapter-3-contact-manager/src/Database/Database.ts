import { ITable } from './TableBuilder';
import { RecordState } from '../RecordSate';

export class Database<T extends RecordState> {
  private readonly indexDb: IDBFactory;
  private database: IDBDatabase | null = null;
  private readonly table: ITable;

  constructor(table: ITable) {
    this.indexDb = window.indexedDB;
    this.table = table;
    this.OpenDatabase();
  }

  Create(state: T): Promise<void> {
    return new Promise((resolve, reject) => {
      const dbStore = this.GetObjectStore();
      const innerRequest: IDBRequest = dbStore!.add(state);
      innerRequest.onsuccess = () => {
        resolve();
      };
      innerRequest.onerror = () => {
        reject();
      };
    });
  }

  Read(): Promise<T[]> {
    return new Promise((response) => {
      const dbStore = this.GetObjectStore();
      const items = new Array<T>();
      const request: IDBRequest = dbStore!.openCursor();
      request.onsuccess = (e: any) => {
        const cursor: IDBCursorWithValue = e.target.result;
        if (cursor) {
          const result: T = cursor.value;
          if (result.IsActive) {
            items.push(result);
          }
          cursor.continue();
        } else {
          // When cursor is null, that is the point that we want to return back to our calling code.
          response(items);
        }
      };
    });
  }

  Update(state: T): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.GetObjectStore();
      const innerRequest: IDBRequest = dbStore!.put(state);
      innerRequest.onsuccess = () => {
        resolve();
      };
    });
  }

  Delete(idx: number | string): Promise<void> {
    return new Promise((resolve) => {
      const dbStore = this.GetObjectStore();
      const innerRequest: IDBRequest = dbStore!.delete(idx.toString());
      innerRequest.onsuccess = () => {
        resolve();
      };
    });
  }

  OpenDatabase(): void {
    const open = this.indexDb.open(this.table.DataBase(), this.table.Version());
    open.onupgradeneeded = (e: any) => {
      this.UpgradeDatabase(e.target.result);
    };
    open.onsuccess = (e: any) => {
      this.database = e.target.result;
    };
  }

  UpgradeDatabase(database: IDBDatabase): void {
    this.database = database;
    this.table.Build(this.database);
  }

  private GetObjectStore(): IDBObjectStore | null {
    try {
      const transaction: IDBTransaction = this.database!.transaction(this.table.TableName(), 'readwrite');
      const dbStore: IDBObjectStore = transaction.objectStore(this.table.TableName());
      return dbStore;
    } catch (Error) {
      return null;
    }
  }
}
