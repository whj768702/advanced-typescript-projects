import { TagType, TagTypeToHtml } from './markdown-parser';
import { VisitorBase } from './visitor-pattern';

class Header1Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header1, new TagTypeToHtml());
  }
}

class Header2Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header2, new TagTypeToHtml());
  }
}
class Header3Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header3, new TagTypeToHtml());
  }
}

class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.Paragraph, new TagTypeToHtml());
  }
}
class HorizontalRuleVisitor extends VisitorBase {
  constructor() {
    super(TagType.HorizontalRule, new TagTypeToHtml());
  }
}

export { Header1Visitor, Header2Visitor, Header3Visitor, ParagraphVisitor, HorizontalRuleVisitor };
