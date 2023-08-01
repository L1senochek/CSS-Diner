import { ElementParam } from '../../../../../types/creator/creator';
import CreatorElement from '../../../../creator/creator';
import { View } from '../../../../creator/view';
import './table.css';

export class TableView extends View {
  tableContent!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.tableContent = new CreatorElement({ classNames: ['table__content'] }).getElement();
    const tableSurface = new CreatorElement({ classNames: ['table__surface'] }).getElement();
    this.view.getElement().prepend(this.tableContent, tableSurface);
  }
}
