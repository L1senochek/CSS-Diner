import CreatorElement, { ElementParam } from '../../../../../creator/creator';
import { View } from '../../../../../creator/view';
import './editorWindow.css';

export class MarkupView extends View {
  codeWrapper: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.codeWrapper = new CreatorElement({ tag: 'code', classNames: ['code__wrapper'] }).getElement();
    const markup = new CreatorElement({ tag: 'pre', classNames: ['markup'] }).getElement();
    markup.appendChild(this.codeWrapper);
    this.view.getElement().appendChild(markup);
  }
}
