import { ElementParam } from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './chopsticks.css';

class ChopstickView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

export class ChopsticksView extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    const chopstick = new ChopstickView({ tag: 'div', classNames: ['chopstick'] });
    chopstick.appendElems([
      { tag: 'span', classNames: ['chopstick__back'] },
      { tag: 'span', classNames: ['chopstick__top'] },
      { tag: 'span', classNames: ['chopstick__bottom'] },
    ]);
    this.view.getElement().append(chopstick.getHTMLElement(), chopstick.getHTMLElement().cloneNode(true));
  }
}
