import { MarkdownDocument, IMarkdownDocument } from './markdown-document';
import { ParseChainHandler } from './responsible-chain';

import {
  Header1ChainHandler,
  Header2ChainHandler,
  Header3ChainHandler,
  HorizontalRuleHandler,
  ParagraphHandler,
} from './concrete-chain-responsibility';
import { ParseElement } from './line-parser';

class ChainOfResponsibilityFactory {
  Build(document: IMarkdownDocument): ParseChainHandler {
    let header1 = new Header1ChainHandler(document);
    let header2 = new Header2ChainHandler(document);
    let header3 = new Header3ChainHandler(document);
    let HorizontalRule = new HorizontalRuleHandler(document);
    let paragraph = new ParagraphHandler(document);

    header1.SetNext(header2);
    header2.SetNext(header3);
    header3.SetNext(HorizontalRule);
    HorizontalRule.SetNext(paragraph);

    return header1;
  }
}

class Markdown {
  ToHtml(text: string): string {
    let document = new MarkdownDocument();
    let header1 = new ChainOfResponsibilityFactory().Build(document);

    let lines = text.split(`\n`);
    for (let index = 0; index < lines.length; index++) {
      let parseElement = new ParseElement();
      parseElement.CurrentLine = lines[index];
      header1.HandleRequest(parseElement);
    }

    return document.Get();
  }
}
class HtmlHandler {
  private markdownChange: Markdown = new Markdown();

  public TextChangeHandler(id: string, output: string): void {
    let markdown = <HTMLTextAreaElement>document.getElementById(id);
    let markdownOutput = <HTMLLabelElement>document.getElementById(output);

    if (markdown !== null) {
      markdown.onkeyup = () => {
        this.RenderHtmlContent(markdown, markdownOutput);
      };
      window.onload = () => {
        this.RenderHtmlContent(markdown, markdownOutput);
      };
    }
  }
  private RenderHtmlContent(markdown: HTMLTextAreaElement, markdownOutput: HTMLLabelElement) {
    console.log('markdown value: ', markdown.value);
    if (markdown.value) {
      markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
    } else {
      markdownOutput.innerHTML = '<p></p>';
    }
  }
}

new HtmlHandler().TextChangeHandler('markdown', 'markdown-output');
