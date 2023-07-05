import CreatorElement, { ElementParam } from '../../../creator/creator';
import { ElementFilled } from '../../../creator/fillDiv';
import { View } from '../../../creator/view';
import './game.css';

// export class _GameView {
//   gameView: CreatorElement;
//   constructor() {
//     this.gameView = this.createGame();
//   }

//   getHTMLElement() {
//     return this.gameView.getElement();
//   }

//   createGame() {
//     const creator = new ElementFilled();
//     const gameParam = creator.createDiv('div', ['game']);
//     const gameCreator = new CreatorElement(gameParam);
//     return gameCreator;
//   }
// }

export class GameView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}
