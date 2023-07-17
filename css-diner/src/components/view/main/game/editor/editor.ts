import { ElementParam } from '../../../../../types/creator/creator';
import CreatorElement from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './editor.css';

class editorHeaderView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

export class EditorView extends View {
  windowCreatorCSS!: HTMLElement;
  windowCreatorHTML!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.windowCreatorCSS = new CreatorElement({
      classNames: ['editor__window'],
      innerText: '',
    }).getElement();
    this.windowCreatorHTML = new CreatorElement({
      classNames: ['editor__window'],
      innerText: '',
    }).getElement();
    const lineNumCreator = new CreatorElement({
      classNames: ['editor__line-numbers'],
      innerText: '',
    }).getElement();
    for (const i of Array.from({ length: 10 }, (_, index) => index + 1)) {
      lineNumCreator.innerHTML += `${i.toString()}<br>`;
    }
    this.windowCreatorCSS.prepend(lineNumCreator);
    this.windowCreatorHTML.prepend(lineNumCreator.cloneNode(true));

    const headerCreator = new editorHeaderView({ classNames: ['editor__header-input'], innerText: '' });
    headerCreator.appendElems([
      { classNames: ['editor__title'], innerText: 'CSS Editor' },
      { classNames: ['editor__file-name'], innerText: 'style.css' },
    ]);
    const cssPaneCreator = new CreatorElement({ classNames: ['editor__pane', 'css-pane'], innerText: '' });
    cssPaneCreator.getElement().prepend(headerCreator.getHTMLElement(), this.windowCreatorCSS);
    const htmlPaneCreator = new CreatorElement({
      classNames: ['editor__pane', 'html-pane'],
      innerText: '',
    });
    const headerCreatorWin = new editorHeaderView({ classNames: ['editor__header-input'], innerText: '' });
    headerCreatorWin.appendElems([
      { classNames: ['editor__title'], innerText: 'HTML Viewer' },
      { classNames: ['editor__file-name'], innerText: 'table.html' },
    ]);
    htmlPaneCreator.getElement().prepend(headerCreatorWin.getHTMLElement(), this.windowCreatorHTML);
    this.view.getElement().prepend(cssPaneCreator.getElement(), htmlPaneCreator.getElement());
  }
}
