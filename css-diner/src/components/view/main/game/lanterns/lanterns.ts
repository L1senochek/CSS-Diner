import { ElementParam } from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './lanterns.css';

class lanternView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

export class LanternView extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    const lanternOne = new lanternView({ tag: 'span', classNames: ['lantern'] });
    lanternOne.appendElems([{ tag: 'span', classNames: ['lantern__title'], innerText: '壽司' }]);
    const lanternTwo = new lanternView({ tag: 'span', classNames: ['lantern'] });
    lanternTwo.appendElems([{ tag: 'span', classNames: ['lantern__title'], innerText: '貓' }]);

    this.view.getElement().append(lanternOne.getHTMLElement());
    this.view.getElement().append(lanternTwo.getHTMLElement());
    this.view.getElement().append(lanternOne.getHTMLElement().cloneNode(true));
    this.view.getElement().append(lanternTwo.getHTMLElement().cloneNode(true));
  }
}
