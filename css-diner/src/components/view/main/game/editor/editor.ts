import CreatorElement, { ElementParam } from '../../../../creator/creator';
import { ElementFilled } from '../../../../creator/fillDiv';
import { View } from '../../../../creator/view';
import './editor.css';

class editorHeaderView extends View {
  constructor(param: ElementParam) {
    super(param) 
  }
}

// export class _EditorView {
//   editorView: CreatorElement;
//   constructor() {
//     this.editorView = this.createEditor();
//   }

//   getHTMLElement() {
//     return this.editorView.getElement();
//   }

//   createEditor() {
//     const creator = new ElementFilled();
//     const editorParam = creator.createDiv('div', ['game__editor', 'editor'], '');

//     const cssPane = creator.createDiv('div', ['editor__pane', 'css-pane'], '');
//     const htmlPane = creator.createDiv('div', ['editor__pane', 'html-pane'], '');

//     const editorHeader = creator.createDiv('div', ['editor__header-input'], '');
//     const editorWindow = creator.createDiv('div', ['editor__window'], '');

//     const titleCSS = creator.createDiv('div', ['editor__title'], 'CSS Editor');
//     const fileNameCSS = creator.createDiv('div', ['editor__file-name'], 'style.css');
//     const titleHTML = creator.createDiv('div', ['editor__title'], 'HTML Viewer');
//     const fileNameHTML = creator.createDiv('div', ['editor__file-name'], 'table.html');
//     const lineNumbers = creator.createDiv('div', ['editor__line-numbers'], '');
//     const editorCreator = new CreatorElement(editorParam);

//     const cssPaneCreator = new CreatorElement(cssPane).getElement();
//     const htmlPaneCreator = new CreatorElement(htmlPane).getElement();

//     const headerCreator = new CreatorElement(editorHeader).getElement();
//     const windowCreator = new CreatorElement(editorWindow).getElement();

//     const titleCSSCreator = new CreatorElement(titleCSS).getElement();
//     const fileNameCSSCreator = new CreatorElement(fileNameCSS).getElement();

//     const titleHTMLCreator = new CreatorElement(titleHTML).getElement();
//     const fileNameHTMLCreator = new CreatorElement(fileNameHTML).getElement();

//     const lineNumCreator = new CreatorElement(lineNumbers).getElement();
 

//     if (
//       headerCreator instanceof Node &&
//       windowCreator instanceof Node &&
//       titleCSSCreator instanceof Node &&
//       fileNameCSSCreator instanceof Node &&
//       titleHTMLCreator instanceof Node &&
//       fileNameHTMLCreator instanceof Node
//     ) {
//       headerCreator?.prepend(titleCSSCreator, fileNameCSSCreator);
//       const headerClone = headerCreator.cloneNode(true);
//       const windowClone = windowCreator.cloneNode(true);
//       cssPaneCreator?.prepend(headerClone, windowClone);
//       headerCreator.innerHTML = '';
//       headerCreator?.prepend(titleHTMLCreator, fileNameHTMLCreator);
//       htmlPaneCreator?.prepend(headerCreator, windowCreator);
//     }

//     if (cssPaneCreator instanceof Node && htmlPaneCreator instanceof Node) {
//       editorCreator.getElement()?.prepend(cssPaneCreator, htmlPaneCreator);
//     }

//     return editorCreator;
//   }
// }


export class EditorView extends View {
  windowCreatorCSS: HTMLElement | null = null;
  windowCreatorHTML: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.windowCreatorCSS = new CreatorElement({tag: 'div', classNames: ['editor__window'], innerText: ''}).getElement();
    this.windowCreatorHTML = new CreatorElement({tag: 'div', classNames: ['editor__window'], innerText: ''}).getElement();
    const lineNumCreator = new CreatorElement({tag: 'div', classNames: ['editor__line-numbers'], innerText: ''}).getElement();
    for (const i of Array.from({ length: 10 }, (_, index) => index + 1)) {
      lineNumCreator.innerHTML += `${i.toString()}<br>`;
    }
    this.windowCreatorCSS.prepend(lineNumCreator);
    this.windowCreatorHTML.prepend(lineNumCreator.cloneNode(true));

    const headerCreator = new editorHeaderView({ tag: 'div', classNames: ['editor__header-input'], innerText: '' });
    headerCreator.appendElems([
      { tag: 'div', classNames: ['editor__title'], innerText: 'CSS Editor'},
      { tag: 'div', classNames: ['editor__file-name'], innerText: 'style.css'}
    ]);
    const cssPaneCreator = new CreatorElement({tag: 'div', classNames: ['editor__pane', 'css-pane'], innerText: ''});
    cssPaneCreator.getElement().prepend(headerCreator.getHTMLElement(), this.windowCreatorCSS)
    const htmlPaneCreator = new CreatorElement({tag: 'div', classNames: ['editor__pane', 'html-pane'], innerText: ''});
    const headerCreatorWin = new editorHeaderView({ tag: 'div', classNames: ['editor__header-input'], innerText: '' });
    headerCreatorWin.appendElems([
      { tag: 'div', classNames: ['editor__title'], innerText: 'HTML Viewer'},
      { tag: 'div', classNames: ['editor__file-name'], innerText: 'table.html'}
    ]);
    htmlPaneCreator.getElement().prepend(headerCreatorWin.getHTMLElement(), this.windowCreatorHTML);
    console.log(this.view)
    this.view.getElement().prepend(cssPaneCreator.getElement(), htmlPaneCreator.getElement());
  }
}
