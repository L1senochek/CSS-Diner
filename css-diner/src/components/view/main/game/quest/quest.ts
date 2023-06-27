import CreatorElement from "../../../../creator/creator";
import { ElementFilled } from "../../../../creator/fillDiv";

export class GameQuestView {
  gameQuestView: CreatorElement;
  constructor() {
    this.gameQuestView = this.createGame();
  }
  getHTMLElement() {
    return this.gameQuestView.getElement();
  }
  createGame() {
    const creator = new ElementFilled();
    const gameQuest = creator.createDiv('p2', ['game__quest']);
    const gameCreator = new CreatorElement(gameQuest);
    return gameCreator;
  }
}