import CreatorElement, { ElementParam } from '../../creator/creator';
import { View } from '../../creator/view';
import './main.css';

export class MainView extends View {
  mainWrapper: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.mainWrapper = new CreatorElement({tag: 'div', classNames: ['wrapper']}).getElement();
    this.view.getElement().prepend(this.mainWrapper)
  }
}
