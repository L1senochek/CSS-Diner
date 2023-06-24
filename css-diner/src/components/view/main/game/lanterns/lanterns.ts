import CreatorElement from "../../../../creator/creator";

const lanternParam = {
  tag: 'div',
  classNames: ['game__lanterns'],
  innerText: '',
  callback: null,
}

const lantern = {
  tag: 'span',
  classNames: ['lantern'],
  innerText: '',
  callback: null,
}

const firstLantern = {
  tag: 'span',
  classNames: ['lantern__title'],
  innerText: '壽司',
  callback: null,
}

const secondLantern = {
  tag: 'span',
  classNames: ['lantern__title'],
  innerText: '貓',
  callback: null,
}



export class LanternView {
  lanternView: CreatorElement;
  constructor() {
    this.lanternView = this.createLanterns();
  }

  getHTMLElement() {
    return this.lanternView.getElement();
  }

  createLanterns() {
    const lanternWrapper = new CreatorElement(lanternParam);
    const lanternCreatorOne = new CreatorElement(lantern).getElement();
    const lanternCreatorTwo = new CreatorElement(lantern).getElement();
    const firtsLanternCreator = new CreatorElement(firstLantern).getElement();
    const secondLanternCreator = new CreatorElement(secondLantern).getElement();
    // const helpCreator = new CreatorElement(headerHelp).getElement();
    
    if (firtsLanternCreator instanceof Node && secondLanternCreator instanceof Node) {
      lanternCreatorOne?.prepend(firtsLanternCreator);
      lanternCreatorTwo?.prepend(secondLanternCreator);
    }

    const lanternCreators = [lanternCreatorOne, lanternCreatorTwo];

    lanternCreators.map(lanternCreator => {
      if (lanternCreator instanceof Node) {
        [...Array(2)].map(() => lanternWrapper.getElement()?.prepend(lanternCreator.cloneNode(true)));
      }
    });

    return lanternWrapper;
  }


}