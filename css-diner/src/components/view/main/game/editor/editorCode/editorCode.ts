import CreatorElement, { ElementParam } from '../../../../../creator/creator';
import { View } from '../../../../../creator/view';
import './editorCode.css';

const codeFragment = `
  {
    /* Styles would go here. */
  }`;

export class EditorCodeView extends View {
  inputField: HTMLElement | null = null;
  enterBtn: HTMLElement | null = null;
  test?: 4;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.inputField = new CreatorElement({
      tag: 'input',
      classNames: ['input__field'],
      innerText: '',
      callback: null,
      attributes: {
        type: 'text',
        placeholder: 'Type in a CSS selector',
      },
    }).getElement();
    this.enterBtn = new CreatorElement({
      tag: 'button',
      classNames: ['input__enter'],
      innerText: 'enter',
    }).getElement();
    const inputWrapperCreator = new CreatorElement({ tag: 'div', classNames: ['input__wrapper'] }).getElement();
    const pre = new CreatorElement({ tag: 'pre', classNames: ['input__code'] }).getElement();
    const codeTip = new CreatorElement({
      tag: 'code',
      classNames: ['input__tip'],
      innerText: `${codeFragment}`,
    }).getElement();

    pre.prepend(codeTip);
    inputWrapperCreator.prepend(this.inputField, this.enterBtn);
    this.view.getElement().prepend(inputWrapperCreator, pre);
  }
}
