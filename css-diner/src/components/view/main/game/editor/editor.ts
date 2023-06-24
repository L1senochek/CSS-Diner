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
    if (cssPaneCreator instanceof Node && htmlPaneCreator instanceof Node) {
      editorCreator.getElement()?.prepend(cssPaneCreator, htmlPaneCreator);
    }
    return editorCreator;
  }
}