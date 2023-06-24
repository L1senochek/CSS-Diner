import CreatorElement from "../../../../creator/creator";

const gameTable = {
  tag: 'div',
  classNames: ['game__table', 'table__wrapper'],
  innerText: '',
  callback: null,
}

const tableSurface = {
  tag: 'div',
  classNames: ['table__surface'],
  innerText: '',
  callback: null,
}

const tableContent = {
  tag: 'div',
  classNames: ['table__content'],
  innerText: '',
  callback: null,
}

export class TableView {
  tableView: CreatorElement;
  constructor() {
    this.tableView = this.createTable();
  }

  getHTMLElement() {
    return this.tableView.getElement();
  }

  createTable() {
    const tableCreator = new CreatorElement(gameTable);
    const surfaceCreator = new CreatorElement(tableSurface).getElement();
    const contentCreator = new CreatorElement(tableContent).getElement();

    if (surfaceCreator instanceof Node && contentCreator instanceof Node) {
      tableCreator.getElement()?.prepend(surfaceCreator, contentCreator);
    }
    return tableCreator;
  }
}