import CreatorElement, { ElementParam } from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './editor.css';

class editorHeaderView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

export class EditorView extends View {
  windowCreatorCSS: HTMLElement | null = null;
  windowCreatorHTML: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.windowCreatorCSS = new CreatorElement({
      tag: 'div',
      classNames: ['editor__window'],
      innerText: '',
    }).getElement();
    this.windowCreatorHTML = new CreatorElement({
      tag: 'div',
      classNames: ['editor__window'],
      innerText: '',
    }).getElement();
    const lineNumCreator = new CreatorElement({
      tag: 'div',
      classNames: ['editor__line-numbers'],
      innerText: '',
    }).getElement();
    for (const i of Array.from({ length: 10 }, (_, index) => index + 1)) {
      lineNumCreator.innerHTML += `${i.toString()}<br>`;
    }
    this.windowCreatorCSS.prepend(lineNumCreator);
    this.windowCreatorHTML.prepend(lineNumCreator.cloneNode(true));

    const headerCreator = new editorHeaderView({ tag: 'div', classNames: ['editor__header-input'], innerText: '' });
    headerCreator.appendElems([
      { tag: 'div', classNames: ['editor__title'], innerText: 'CSS Editor' },
      { tag: 'div', classNames: ['editor__file-name'], innerText: 'style.css' },
    ]);
    const cssPaneCreator = new CreatorElement({ tag: 'div', classNames: ['editor__pane', 'css-pane'], innerText: '' });
    cssPaneCreator.getElement().prepend(headerCreator.getHTMLElement(), this.windowCreatorCSS);
    const htmlPaneCreator = new CreatorElement({
      tag: 'div',
      classNames: ['editor__pane', 'html-pane'],
      innerText: '',
    });
    const headerCreatorWin = new editorHeaderView({ tag: 'div', classNames: ['editor__header-input'], innerText: '' });
    headerCreatorWin.appendElems([
      { tag: 'div', classNames: ['editor__title'], innerText: 'HTML Viewer' },
      { tag: 'div', classNames: ['editor__file-name'], innerText: 'table.html' },
    ]);
    htmlPaneCreator.getElement().prepend(headerCreatorWin.getHTMLElement(), this.windowCreatorHTML);
    this.view.getElement().prepend(cssPaneCreator.getElement(), htmlPaneCreator.getElement());
  }
}
