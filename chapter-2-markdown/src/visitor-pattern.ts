import { IMarkdownDocument } from './markdown-document';
import { TagType, TagTypeToHtml } from './markdown-parser';

interface IVisitor {
  Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

interface IVisitable {
  Accept(Visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

class Visitable implements IVisitable {
  Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void {
    visitor.Visit(token, markdownDocument);
  }
}

abstract class VisitorBase implements IVisitor {
  constructor(private readonly tagType: TagType, private readonly tagTypeToHtml: TagTypeToHtml) {}

  Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    markdownDocument.Add(
      this.tagTypeToHtml.OpeningTag(this.tagType),
      token.CurrentLine,
      this.tagTypeToHtml.ClosingTag(this.tagType)
    );
  }
}

export { IVisitable, Visitable, VisitorBase, IVisitor };
