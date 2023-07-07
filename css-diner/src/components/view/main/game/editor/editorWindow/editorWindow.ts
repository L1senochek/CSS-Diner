import CreatorElement, { ElementParam } from '../../../../../creator/creator';
import { View } from '../../../../../creator/view';
import './editorWindow.css';

// export class _MarkupView {
//   markupView: CreatorElement;
//   constructor() {
//     this.markupView = this.createMarkup();
//   }

//   getHTMLElement() {
//     return this.markupView.getElement();
//   }

//   createMarkup() {
//     const creator = new ElementFilled();
//     const editorCode = creator.createDiv('div', ['editor__code']);
//     const markup = creator.createDiv('pre', ['markup']);
//     const codeWrapper = creator.createDiv('code', ['code__wrapper']);
//     const editorCodeCreator = new CreatorElement(editorCode);
//     const markupCreator = new CreatorElement(markup).getElement();
//     const codeWrapperCreator = new CreatorElement(codeWrapper).getElement();
//     if (codeWrapperCreator) codeWrapperCreator.innerHTML = '';
//     if (codeWrapperCreator) markupCreator?.appendChild(codeWrapperCreator);
//     if (markupCreator) editorCodeCreator.getElement()?.appendChild(markupCreator);
//     return editorCodeCreator;
//   }
// }

export class MarkupView extends View {
  codeWrapper: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.codeWrapper = new CreatorElement({ tag: 'code', classNames: ['code__wrapper']}).getElement();

    const markup = new CreatorElement({ tag: 'pre', classNames: ['markup']}).getElement();

    markup.appendChild(this.codeWrapper);
    this.view.getElement().appendChild(markup);
  }
}
