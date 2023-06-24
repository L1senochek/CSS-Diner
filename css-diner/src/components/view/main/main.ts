import CreatorElement from "../../creator/creator";

const mainParam = {
  tag: 'main',
  classNames: ['main'],
  innerText: '',
  // innerHTML : ['<div class="wrapper">', '</div>'],
  callback: null,
}

const mainWrapper = {
  tag: 'div',
  classNames: ['wrapper'],
  innerText: '',
  callback: null,
}

export class MainView {
  mainView: CreatorElement;
  constructor() {
    this.mainView = this.createMain();
  }

  getHTMLElement() {
    return this.mainView.getElement();
  }

  createMain() {
    const mainCreator = new CreatorElement(mainParam);
    const wrapperCreator = new CreatorElement(mainWrapper).getElement();
    
    if (wrapperCreator instanceof Node) {
      mainCreator.getElement()?.prepend(wrapperCreator);
    }

    return mainCreator;
  }
}