import CreatorElement from '../../creator/creator';
import { ElementFilled } from '../../creator/fillDiv';
import './main.css';

export class MainView {
  mainView: CreatorElement;
  constructor() {
    this.mainView = this.createMain();
  }

  getHTMLElement() {
    return this.mainView.getElement();
  }

  createMain() {
    const creator = new ElementFilled();
    const mainParam = creator.createDiv('main', ['main']);
    const mainWrapper = creator.createDiv('div', ['wrapper']);
    const mainCreator = new CreatorElement(mainParam);
    const wrapperCreator = new CreatorElement(mainWrapper).getElement();
    if (wrapperCreator) mainCreator.getElement()?.prepend(wrapperCreator);
    return mainCreator;
  }
}
