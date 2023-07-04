import CreatorElement, { ElementParam } from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './table.css';

export class TableView extends View {
  tableContent: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.tableContent = new CreatorElement({ tag: 'div', classNames: ['table__content'] }).getElement();
    const tableSurface = new CreatorElement({ tag: 'div', classNames: ['table__surface'] }).getElement();
    this.view.getElement().prepend(this.tableContent, tableSurface);
  }
}
