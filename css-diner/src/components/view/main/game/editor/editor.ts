import CreatorElement from "../../../../creator/creator";
import { ElementFilled } from "../../../../creator/fillDiv";

export class EditorView {
  editorView: CreatorElement;
  constructor() {
    this.editorView = this.createEditor();
  }

  getHTMLElement() {
    return this.editorView.getElement();
  }

  createEditor() {
    const creator = new ElementFilled();
    const editorParam = creator.createDiv('div', ['game__editor', 'editor'], '');
    const cssPane = creator.createDiv('div', ['editor__pane', 'css-pane'], '');
    const htmlPane = creator.createDiv('div', ['editor__pane', 'html-pane'], '');
    const editorHeader = creator.createDiv('div', ['editor__header-input'], '');
    const editorWindow = creator.createDiv('div', ['editor__window'], '');
    const titleCSS = creator.createDiv('div', ['editor__title'], 'CSS Editor');
    const fileNameCSS = creator.createDiv('div', ['editor__file-name'], 'style.css');
    const titleHTML = creator.createDiv('div', ['editor__title'], 'HTML Viewer');
    const fileNameHTML = creator.createDiv('div', ['editor__file-name'], 'table.html');
    const lineNumbers = creator.createDiv('div', ['editor__line-numbers'], ''); 
    const editorCreator = new CreatorElement(editorParam);
    const cssPaneCreator = new CreatorElement(cssPane).getElement();
    const htmlPaneCreator = new CreatorElement(htmlPane).getElement();
    const headerCreator = new CreatorElement(editorHeader).getElement();
    const windowCreator = new CreatorElement(editorWindow).getElement();
    const titleCSSCreator = new CreatorElement(titleCSS).getElement();
    const fileNameCSSCreator = new CreatorElement(fileNameCSS).getElement();
    const titleHTMLCreator = new CreatorElement(titleHTML).getElement();
    const fileNameHTMLCreator = new CreatorElement(fileNameHTML).getElement();
    const lineNumCreator = new CreatorElement(lineNumbers).getElement();

    if (lineNumCreator instanceof Node) {
      for (let i of Array.from({ length: 10 }, (_, index) => index + 1)) {
        lineNumCreator.innerHTML += `${i.toString()}<br>`;
      }
      windowCreator?.prepend(lineNumCreator);
    }

    if (
      headerCreator instanceof Node
      && windowCreator instanceof Node
      && titleCSSCreator instanceof Node
      && fileNameCSSCreator instanceof Node
      && titleHTMLCreator instanceof Node
      && fileNameHTMLCreator instanceof Node
      ) {
      headerCreator?.prepend(titleCSSCreator, fileNameCSSCreator);
      const headerClone = headerCreator.cloneNode(true);
      const windowClone = windowCreator.cloneNode(true);
      cssPaneCreator?.prepend(headerClone, windowClone);
      headerCreator.innerHTML = '';
      headerCreator?.prepend(titleHTMLCreator, fileNameHTMLCreator);
      htmlPaneCreator?.prepend(headerCreator, windowCreator);
    }

    if (cssPaneCreator instanceof Node && htmlPaneCreator instanceof Node) {
      editorCreator.getElement()?.prepend(cssPaneCreator, htmlPaneCreator);
    }

    return editorCreator;
  }
}
