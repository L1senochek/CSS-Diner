import CreatorElement from "../../../../../creator/creator"
import { ElementFilled } from "../../../../../creator/fillDiv";

export class MarkupView {
  markupView: CreatorElement;
  constructor() {
    this.markupView = this.createMarkup();
  }

  getHTMLElement() {
    return this.markupView.getElement();
  }

  createMarkup() {
    const creator = new ElementFilled();
    const editorCode = creator.createDiv('div', ['editor__code']);
    const markup = creator.createDiv('pre', ['markup']);
    const codeWrapper = creator.createDiv('code', ['code__wrapper']);
    const editorCodeCreator = new CreatorElement(editorCode);
    const markupCreator = new CreatorElement(markup).getElement();
    const codeWrapperCreator = new CreatorElement(codeWrapper).getElement();
    if (codeWrapperCreator) codeWrapperCreator.innerHTML = '';
    if (codeWrapperCreator) markupCreator?.appendChild(codeWrapperCreator);
    if (markupCreator) editorCodeCreator.getElement()?.appendChild(markupCreator);
    return editorCodeCreator;
  }
}
