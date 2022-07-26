import { StringOrNull } from './../Types';

export interface ITableBuilder {
  WithDatabase(databaseName: string): ITableBuilder;
  WithVersion(version: number): ITableBuilder;
  WithTableName(tableName: string): ITableBuilder;
  WithPrimaryField(primaryField: string): ITableBuilder;
  WithIndexName(indexName: string): ITableBuilder;
}

export interface ITable {
  DataBase(): string;
  Version(): number;
  TableName(): string;
  PrimaryField(): string;
  IndexName(): string;
  Build(database: IDBDatabase): void;
}

export class TableBuild implements ITableBuilder, ITable {
  private database: StringOrNull = null;
  private tableName: StringOrNull = null;
  private primaryField: StringOrNull = null;
  private indexName: StringOrNull = null;
  private version: number = 1;

  WithDatabase(databaseName: string): ITableBuilder {
    this.database = databaseName;
    return this;
  }
  WithVersion(version: number): ITableBuilder {
    this.version = version;
    return this;
  }
  WithTableName(tableName: string): ITableBuilder {
    this.tableName = tableName;
    return this;
  }
  WithPrimaryField(primaryField: string): ITableBuilder {
    this.primaryField = primaryField;
    return this;
  }
  WithIndexName(indexName: string): ITableBuilder {
    this.indexName = indexName;
    return this;
  }

  DataBase(): string {
    return this.database || '';
  }
  Version(): number {
    return this.version;
  }
  TableName(): string {
    return this.tableName || '';
  }
  IndexName(): string {
    return this.indexName || '';
  }
  PrimaryField(): string {
    return this.primaryField || '';
  }

  Build(database: IDBDatabase): void {
    const parameters: IDBObjectStoreParameters = {
      keyPath: this.primaryField,
    };
    const objectStore = database.createObjectStore(this.tableName!, parameters);
    objectStore!.createIndex(this.indexName!, this.primaryField!);
  }
}
