import { ElementParam } from '../../../../../types/creator/creator';
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

  private changeView(): void {
    const chopstick = new ChopstickView({ classNames: ['chopstick'] });
    chopstick.appendElems([
      { tag: 'span', classNames: ['chopstick__back'] },
      { tag: 'span', classNames: ['chopstick__top'] },
      { tag: 'span', classNames: ['chopstick__bottom'] },
    ]);
    this.view.getElement().append(chopstick.getHTMLElement(), chopstick.getHTMLElement().cloneNode(true));
  }
}
