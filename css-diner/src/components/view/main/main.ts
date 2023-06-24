import CreatorElement from "../../creator/creator";

export class MainView {
  mainView: CreatorElement;
  constructor() {
    this.mainView = this.createMain();
  }

  getHTMLElement() {
    return this.mainView.getElement();
  }

  createMain() {
    const mainParam = {
      tag: 'main',
      classNames: ['main'],
      innerText: '',
      // innerHTML : ['<div class="wrapper">', '</div>'],
      callback: null,
    }

    const mainCreator = new CreatorElement(mainParam);
    console.log(mainCreator);

    return mainCreator;
  }
}