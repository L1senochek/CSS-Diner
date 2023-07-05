import CreatorElement, { ElementParam } from '../../../../../creator/creator';
// import { ElementFilled } from '../../../../../creator/fillDiv';
import { View } from '../../../../../creator/view';
import './editorCode.css';

const codeFragment = `
<pre class="input__code">
<code class="input__tip">
  {
    /* Styles would go here. */
  }  
</code>
</pre>`;

// export class _EditorCodeView {
//   editorCodeView: CreatorElement;
//   constructor() {
//     this.editorCodeView = this.createEditorCode();
//   }

//   getHTMLElement() {
//     return this.editorCodeView.getElement();
//   }

//   createEditorCode() {
//     const creator = new ElementFilled();
//     const editorCode = creator.createDiv('div', ['editor__code']);
//     const inputWrapper = creator.createDiv('div', ['input__wrapper']);
//     const inputField = creator.createDiv('input', ['input__field'], '', null, {
//       type: 'text',
//       placeholder: 'Type in a CSS selector',
//     });
//     const enterBtn = creator.createDiv('button', ['input__enter'], 'enter');
//     const editorCodeCreator = new CreatorElement(editorCode);
//     const inputWrapperCreator = new CreatorElement(inputWrapper).getElement();
//     const inputFieldCreator = new CreatorElement(inputField).getElement();
//     const enterBtnCreator = new CreatorElement(enterBtn).getElement();
//     const editorCodeElement = editorCodeCreator.getElement();

//     if (inputFieldCreator && enterBtnCreator && inputWrapperCreator && editorCodeElement) {
//       inputWrapperCreator?.prepend(inputFieldCreator, enterBtnCreator);
//       editorCodeElement.innerHTML = `${inputWrapperCreator.outerHTML}${codeFragment}`;
//     }

//     return editorCodeCreator;
//   }
// }

class inputWrapperCreatorView extends View {
  constructor(param: ElementParam) {
    super(param) 
  }
}

export class EditorCodeView extends View {
  inputField: HTMLElement | null = null;
  enterBtn: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.inputField = new CreatorElement({tag: 'input', classNames: ['input__field'], innerText: '', callback: null, attributes: {
      type: 'text',
      placeholder: 'Type in a CSS selector',
    }}).getElement();
    this.enterBtn = new CreatorElement({tag: 'button', classNames: ['input__enter'], innerText: 'enter'}).getElement();
    const inputWrapperCreator = new inputWrapperCreatorView({tag: 'div', classNames: ['input__wrapper']});
    inputWrapperCreator.appendElems([this.inputField, this.enterBtn]);
    this.view.getElement().innerHTML = `${inputWrapperCreator.getHTMLElement().outerHTML}${codeFragment}`;
  }
}
