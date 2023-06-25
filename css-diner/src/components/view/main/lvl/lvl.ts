import CreatorElement from "../../../creator/creator";

const gameParam = {
  tag: 'div',
  classNames: ['lvl__about'],
  innerText: '',
  callback: null,
}

export class LvlAboutViewView {
  lvlAboutView: CreatorElement;
  constructor() {
    this.lvlAboutView = this.createLvlAbout();
  }

  getHTMLElement() {
    return this.lvlAboutView.getElement();
  }

  createLvlAbout() {
    const gameCreator = new CreatorElement(gameParam);
    return gameCreator;
  }

  changeLvlAbout() {
    // получать уровень и перезаписывать состав константы параметров
  }

}