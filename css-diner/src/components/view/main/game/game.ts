import CreatorElement from "../../../creator/creator";

const gameParam = {
  tag: 'div',
  classNames: ['game'],
  innerText: '',
  callback: null,
}

export class GameView {
  gameView: CreatorElement;
  constructor() {
    this.gameView = this.createGame();
  }

  getHTMLElement() {
    return this.gameView.getElement();
  }

  createGame() {
    const gameCreator = new CreatorElement(gameParam);
    return gameCreator;
  }

  changeGame() {
    // получать уровень и перезаписывать состав константы параметров
  }

}