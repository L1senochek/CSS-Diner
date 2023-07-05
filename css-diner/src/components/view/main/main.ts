import CreatorElement, { ElementParam } from '../../creator/creator';
import { ElementFilled } from '../../creator/fillDiv';
import { View } from '../../creator/view';
import './main.css';

// export class _MainView {
//   mainView: CreatorElement;
//   constructor() {
//     this.mainView = this.createMain();
//   }

//   getHTMLElement() {
//     return this.mainView.getElement();
//   }

//   createMain() {
//     const creator = new ElementFilled();
//     const mainParam = creator.createDiv('main', ['main']);
//     const mainWrapper = creator.createDiv('div', ['wrapper']);
//     const mainCreator = new CreatorElement(mainParam);
//     const wrapperCreator = new CreatorElement(mainWrapper).getElement();
//     if (wrapperCreator) mainCreator.getElement()?.prepend(wrapperCreator);
//     return mainCreator;
//   }
// }

export class MainView extends View {
  mainWrapper: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.mainWrapper = new CreatorElement({tag: 'div', classNames: ['wrapper']}).getElement();
    this.view.getElement().prepend(this.mainWrapper)
  }
}