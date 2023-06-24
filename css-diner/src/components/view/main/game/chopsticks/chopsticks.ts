import CreatorElement from "../../../../creator/creator";

const gameChopsticks = {
  tag: 'div',
  classNames: ['game__chopsticks'],
  innerText: '',
  callback: null,
}

const chopsticksBack = {
  tag: 'span',
  classNames: ['chopstick__back'],
  innerText: '',
  callback: null,
}

const chopsticksTop = {
  tag: 'span',
  classNames: ['chopstick__top'],
  innerText: '',
  callback: null,
}

const chopsticksBottom = {
  tag: 'span',
  classNames: ['chopstick__bottom'],
  innerText: '',
  callback: null,
}

export class ChopsticksView {
  chopsticksView: CreatorElement;
  constructor() {
    this.chopsticksView = this.ChopsticksGame();
  }

  getHTMLElement() {
    return this.chopsticksView.getElement();
  }

  ChopsticksGame() {
    const chopsticksCreator = new CreatorElement(gameChopsticks);
    const backCreator = new CreatorElement(chopsticksBack).getElement();
    const topCreator = new CreatorElement(chopsticksTop).getElement();
    const bottomCreator = new CreatorElement(chopsticksBottom).getElement();

    if (
      backCreator instanceof Node
      && topCreator instanceof Node
      && bottomCreator instanceof Node
      ) {
      chopsticksCreator.getElement()?.prepend(backCreator, topCreator, bottomCreator);
    }

    return chopsticksCreator;
  }

}