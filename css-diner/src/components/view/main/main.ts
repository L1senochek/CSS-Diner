import { ElementParam } from '../../../types/creator/creator';
import CreatorElement from '../../creator/creator';
import { View } from '../../creator/view';
import './main.css';

export class MainView extends View {
  mainWrapper!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }
  private changeView(): void {
    this.mainWrapper = new CreatorElement({ classNames: ['wrapper'] }).getElement();
    this.view.getElement().prepend(this.mainWrapper);
  }
}
