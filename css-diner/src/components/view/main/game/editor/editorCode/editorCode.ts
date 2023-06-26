import CreatorElement from "../../../../../creator/creator"

const editorCode = {
  tag: 'div',
  classNames: ['editor__code'],
  innerText: '',
  callback: null,
}

const inputWrapper = {
  tag: 'div',
  classNames: ['input__wrapper'],
  innerText: '',
  callback: null,
}

const inputField = {
  tag: 'input',
  classNames: ['input__field'],
  innerText: '',
  callback: null,
  attributes: {
    type: 'text',
    placeholder: 'Type in a CSS selector',
  },
};

const enterBtn = {
  tag: 'button',
  classNames: ['input__enter'],
  innerText: 'enter',
  callback: null,
}

const codeFragment = `
<pre class="input__code">
<code class="input__tip">
  {
    /* Styles would go here. */
  }  
</code>
<code class="input__help">
  /*
    Type a number to skip to a level.
    Ex → "5" for level 5 
  */
</code>
</pre>`

export class EditorCodeView {
  editorCodeView: CreatorElement;
  constructor() {
    this.editorCodeView = this.createEditorCode();
  }

  getHTMLElement() {
    return this.editorCodeView.getElement();
  }

  createEditorCode() {
    
    const editorCodeCreator = new CreatorElement(editorCode);
    const inputWrapperCreator = new CreatorElement(inputWrapper).getElement();
    const inputFieldCreator = new CreatorElement(inputField).getElement();
    const enterBtnCreator = new CreatorElement(enterBtn).getElement();
    const editorCodeElement = editorCodeCreator.getElement();
    
    if (inputFieldCreator instanceof Node && enterBtnCreator instanceof Node) {
      inputWrapperCreator?.prepend(inputFieldCreator, enterBtnCreator);
    }

    if (editorCodeElement && inputWrapperCreator instanceof Node) {
      editorCodeElement.innerHTML = `${inputWrapperCreator.outerHTML}${codeFragment}`;
    }

    
    return editorCodeCreator;
  }

  createInnerStructure() {}
}