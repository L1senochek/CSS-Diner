import CreatorElement from '../../../../creator/creator';
import { ElementFilled } from '../../../../creator/fillDiv';
import './lanterns.css';

export class LanternView {
  lanternView: CreatorElement;
  constructor() {
    this.lanternView = this.createLanterns();
  }

  getHTMLElement() {
    return this.lanternView.getElement();
  }

  createLanterns() {
    const creator = new ElementFilled();
    const lanternParam = creator.createDiv('div', ['game__lanterns']);
    const lantern = creator.createDiv('span', ['lantern']);
    const firstLantern = creator.createDiv('span', ['lantern__title'], '壽司');
    const secondLantern = creator.createDiv('span', ['lantern__title'], '貓');
    const lanternWrapper = new CreatorElement(lanternParam);
    const lanternCreatorOne = new CreatorElement(lantern).getElement();
    const lanternCreatorTwo = new CreatorElement(lantern).getElement();
    const firtsLanternCreator = new CreatorElement(firstLantern).getElement();
    const secondLanternCreator = new CreatorElement(secondLantern).getElement();

    if (firtsLanternCreator instanceof Node && secondLanternCreator instanceof Node) {
      lanternCreatorOne?.appendChild(firtsLanternCreator);
      lanternCreatorTwo?.appendChild(secondLanternCreator);
    }

    if (lanternCreatorOne && lanternCreatorTwo) {
      lanternWrapper.getElement()?.appendChild(lanternCreatorOne);
      lanternWrapper.getElement()?.appendChild(lanternCreatorTwo);
      lanternWrapper.getElement()?.appendChild(lanternCreatorOne.cloneNode(true));
      lanternWrapper.getElement()?.appendChild(lanternCreatorTwo.cloneNode(true));
    }
    return lanternWrapper;
  }
}
