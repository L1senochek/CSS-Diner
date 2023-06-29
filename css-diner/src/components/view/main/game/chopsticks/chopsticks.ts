import CreatorElement from "../../../../creator/creator";
import { ElementFilled } from "../../../../creator/fillDiv";
import './chopsticks.css'

export class ChopsticksView {
  chopsticksView: CreatorElement;
  constructor() {
    this.chopsticksView = this.ChopsticksGame();
  }

  getHTMLElement() {
    return this.chopsticksView.getElement();
  }

  ChopsticksGame() {
    const creator = new ElementFilled();
    const gameChopsticks = creator.createDiv('div', ['game__chopsticks']);
    const chopstick = creator.createDiv('div', ['chopstick']);
    const chopsticksBack = creator.createDiv('span', ['chopstick__back']);
    const chopsticksTop = creator.createDiv('span', ['chopstick__top']);
    const chopsticksBottom = creator.createDiv('span', ['chopstick__bottom']);
    const chopsticksCreator = new CreatorElement(gameChopsticks);
    const chopstickCreator = new CreatorElement(chopstick).getElement();
    const backCreator = new CreatorElement(chopsticksBack).getElement();
    const topCreator = new CreatorElement(chopsticksTop).getElement();
    const bottomCreator = new CreatorElement(chopsticksBottom).getElement();
    if (backCreator && topCreator && bottomCreator && chopstickCreator) {
      chopstickCreator?.prepend(backCreator, topCreator, bottomCreator);
      chopsticksCreator.getElement()?.append(chopstickCreator);
      chopsticksCreator.getElement()?.append(chopstickCreator.cloneNode(true));
    }
    return chopsticksCreator;
  }
}
