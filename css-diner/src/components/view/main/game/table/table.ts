import CreatorElement from "../../../../creator/creator";
import { ElementFilled } from "../../../../creator/fillDiv";

export class TableView {
  tableView: CreatorElement;
  constructor() {
    this.tableView = this.createTable();
  }

  getHTMLElement() {
    return this.tableView.getElement();
  }

  createTable() {
    const creator = new ElementFilled();
    const gameTable = creator.createDiv('div', ['game__table', 'table__wrapper']);
    const tableSurface = creator.createDiv('div', ['table__surface']);
    const tableContent = creator.createDiv('div', ['table__content']);
    const tableCreator = new CreatorElement(gameTable);
    const surfaceCreator = new CreatorElement(tableSurface).getElement();
    const contentCreator = new CreatorElement(tableContent).getElement();
    if (surfaceCreator instanceof Node && contentCreator instanceof Node) {
      tableCreator.getElement()?.prepend(surfaceCreator, contentCreator);
    }
    return tableCreator;
  }
}
