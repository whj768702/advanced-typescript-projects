export interface IMarkdownDocument {
  Add(...content: Array<string>): void;
  Get(): string;
}

export class MarkdownDocument implements IMarkdownDocument {
  private content: string = '';
  Add(...content: Array<string>) {
    content.forEach((element) => {
      this.content += element;
    });
  }
  Get(): string {
    return this.content;
  }
}
