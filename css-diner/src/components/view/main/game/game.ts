import CreatorElement from "../../../creator/creator";
import { ElementFilled } from "../../../creator/fillDiv";

export class GameView {
  gameView: CreatorElement;
  constructor() {
    this.gameView = this.createGame();
  }

  getHTMLElement() {
    return this.gameView.getElement();
  }

  createGame() {
    const creator = new ElementFilled();
    const gameParam = creator.createDiv('div', ['game']);
    const gameCreator = new CreatorElement(gameParam);
    return gameCreator;
  }

  changeCurrentLvl() {
    // будет хранить currentLvl и переотрисовывать игру в зависимости от переменной currentLvl 
  }
  
  changeGame() {
    // получать уровень и перезаписывать состав константы параметров
  }
}
