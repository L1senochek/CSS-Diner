import CreatorElement from '../../../../../creator/creator';
import { ElementFilled } from '../../../../../creator/fillDiv';
import './editorCode.css';

const codeFragment = `
<pre class="input__code">
<code class="input__tip">
  {
    /* Styles would go here. */
  }  
</code>
</pre>`;

export class EditorCodeView {
  editorCodeView: CreatorElement;
  constructor() {
    this.editorCodeView = this.createEditorCode();
  }

  getHTMLElement() {
    return this.editorCodeView.getElement();
  }

  createEditorCode() {
    const creator = new ElementFilled();
    const editorCode = creator.createDiv('div', ['editor__code']);
    const inputWrapper = creator.createDiv('div', ['input__wrapper']);
    const inputField = creator.createDiv('input', ['input__field'], '', null, {
      type: 'text',
      placeholder: 'Type in a CSS selector',
    });
    const enterBtn = creator.createDiv('button', ['input__enter'], 'enter');
    const editorCodeCreator = new CreatorElement(editorCode);
    const inputWrapperCreator = new CreatorElement(inputWrapper).getElement();
    const inputFieldCreator = new CreatorElement(inputField).getElement();
    const enterBtnCreator = new CreatorElement(enterBtn).getElement();
    const editorCodeElement = editorCodeCreator.getElement();

    if (inputFieldCreator && enterBtnCreator && inputWrapperCreator && editorCodeElement) {
      inputWrapperCreator?.prepend(inputFieldCreator, enterBtnCreator);
      editorCodeElement.innerHTML = `${inputWrapperCreator.outerHTML}${codeFragment}`;
    }

    return editorCodeCreator;
  }
}
