import { TableBuild } from './Database/TableBuilder';

export class PersonalDetailsTableBuilder {
  Build(): TableBuild {
    const tableBuilder = new TableBuild();
    tableBuilder
      .WithDatabase('packt-advanced-typescript-ch3')
      .WithTableName('People')
      .WithPrimaryField('PersonId')
      .WithIndexName('personId')
      .WithVersion(1);

    return tableBuilder;
  }
}
