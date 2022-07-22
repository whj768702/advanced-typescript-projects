import { IMarkdownDocument } from './markdown-document';
import { ParseChainHandler, Handler } from './responsible-chain';
import {
  Header1Visitor,
  Header2Visitor,
  Header3Visitor,
  HorizontalRuleVisitor,
  ParagraphVisitor,
} from './concrete-visitor';
import { Visitable, IVisitable, IVisitor } from './visitor-pattern';

class Header1ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '#', new Header1Visitor());
  }
}

class Header2ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '##', new Header2Visitor());
  }
}

class Header3ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '###', new Header3Visitor());
  }
}

class ParagraphHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();
  private readonly visitor: IVisitor = new ParagraphVisitor();
  protected CanHandle(request: ParseElement): boolean {
    this.visitable.Accept(this.visitor, request, this.document);
    return true;
  }

  constructor(private readonly document: IMarkdownDocument) {
    super();
  }
}

class HorizontalRuleHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '---', new HorizontalRuleVisitor());
  }
}

export { Header1ChainHandler, Header2ChainHandler, Header3ChainHandler, ParagraphHandler, HorizontalRuleHandler };
