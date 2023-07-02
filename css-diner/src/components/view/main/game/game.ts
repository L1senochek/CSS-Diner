import CreatorElement from '../../../creator/creator';
import { ElementFilled } from '../../../creator/fillDiv';
import './game.css';

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
}
