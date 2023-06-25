import CreatorElement from "../../../../creator/creator";

const editorParam = {
  tag: 'div',
  classNames: ['game__editor', 'editor'],
  innerText: '',
  callback: null,
}

const cssPane = {
  tag: 'div',
  classNames: ['editor__pane', 'css-pane'],
  innerText: '',
  callback: null,
}

const htmlPane = {
  tag: 'div',
  classNames: ['editor__pane', 'html-pane'],
  innerText: '',
  callback: null,
}

const editorHeader = {
  tag: 'div',
  classNames: ['editor__header-input'],
  innerText: '',
  callback: null,
}

const editorWindow = {
  tag: 'div',
  classNames: ['editor__window'],
  innerText: '',
  callback: null,
}

const titleCSS = {
  tag: 'div',
  classNames: ['editor__title'],
  innerText: 'CSS Editor',
  callback: null,
}

const fileNameCSS = {
  tag: 'div',
  classNames: ['editor__file-name'],
  innerText: 'style.css',
  callback: null,
}

const titleHTML = {
  tag: 'div',
  classNames: ['editor__title'],
  innerText: 'HTML Viewer',
  callback: null,
}

const fileNameHTML = {
  tag: 'div',
  classNames: ['editor__file-name'],
  innerText: 'table.html',
  callback: null,
}

const lineNumbers = {
  tag: 'div',
  classNames: ['editor__line-numbers'],
  innerText: '',
  callback: null,
}

const editorCode = {
  tag: 'div',
  classNames: ['editor__code'],
  innerText: '',
  callback: null,
}



export class EditorView {
  editorView: CreatorElement;
  constructor() {
    this.editorView = this.createEditor();
  }

  getHTMLElement() {
    return this.editorView.getElement();
  }

  createEditor() {
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
    const codeCreator = new CreatorElement(editorCode).getElement();
    



    if (lineNumCreator instanceof Node && codeCreator instanceof Node) {
      windowCreator?.prepend(lineNumCreator, codeCreator);
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