import CreatorElement from "../../../../creator/creator";
const gameQuest = {
  tag: 'p2',
  classNames: ['game__quest'],
  innerText: 'Select the fancy plate',
  callback: null,
}
export class GameQuestView {
  gameQuestView: CreatorElement;
  constructor() {
    this.gameQuestView = this.createGame();
  }
  getHTMLElement() {
    return this.gameQuestView.getElement();
  }

  createGame() {
    const gameCreator = new CreatorElement(gameQuest);
    return gameCreator;
  }
}