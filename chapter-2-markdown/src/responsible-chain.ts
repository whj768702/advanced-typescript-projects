import { IMarkdownDocument } from './markdown-document';
import { IVisitable, Visitable, VisitorBase } from './visitor-pattern';
import { LinerParser, ParseElement } from './line-parser';

abstract class Handler<T> {
  protected next: Handler<T> | null = null;

  SetNext(next: Handler<T>): void {
    this.next = next;
  }

  HandleRequest(request: T) {
    if (!this.CanHandle(request)) {
      if (this.next !== null) {
        this.next.HandleRequest(request);
      }
      return;
    }
  }
  protected abstract CanHandle(request: T): boolean;
}

class ParseChainHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();

  protected CanHandle(request: ParseElement): boolean {
    let split = new LinerParser().Parse(request.CurrentLine, this.tagType);
    if (split[0]) {
      request.CurrentLine = split[1];
      this.visitable.Accept(this.visitor, request, this.document);
    }
    return split[0];
  }
  constructor(
    private readonly document: IMarkdownDocument,
    private readonly tagType: string,
    private readonly visitor: IVisitor
  ) {
    super();
  }
}

export { ParseChainHandler, Handler };
