import CreatorElement from "../../../../creator/creator";

const createDiv = (classNames:string[], innerText: string) => ({
  tag: 'div',
  classNames: classNames,
  innerText: innerText,
  callback: null,
});

export class EditorView {
  editorView: CreatorElement;

  constructor() {
    this.editorView = this.createEditor();
  }

  getHTMLElement() {
    return this.editorView.getElement();
  }

  createEditor() {
    const editorParam = createDiv(['game__editor', 'editor'], '');
    const cssPane = createDiv(['editor__pane', 'css-pane'], '');
    const htmlPane = createDiv(['editor__pane', 'html-pane'], '');
    const editorHeader = createDiv(['editor__header-input'], '');
    const editorWindow = createDiv(['editor__window'], '');
    const titleCSS = createDiv(['editor__title'], 'CSS Editor');
    const fileNameCSS = createDiv(['editor__file-name'], 'style.css');
    const titleHTML = createDiv(['editor__title'], 'HTML Viewer');
    const fileNameHTML = createDiv(['editor__file-name'], 'table.html');
    const lineNumbers = createDiv(['editor__line-numbers'], '');
    // const editorCode = createDiv(['editor__code'], '');

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
    // const codeCreator = new CreatorElement(editorCode).getElement();

    // if (lineNumCreator instanceof Node && codeCreator instanceof Node) {
    //   windowCreator?.prepend(lineNumCreator, codeCreator);
    // }
    if (lineNumCreator instanceof Node) {
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
