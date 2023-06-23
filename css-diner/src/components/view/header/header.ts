import CreatorElement from "../../creator/creator";

export class HeaderView {
  headerView: CreatorElement;
  constructor() {
    this.headerView = this.createHeader();
  }

  getHTMLElement() {
    return this.headerView.getElement();
  }

  createHeader() {
    const headerParam = {
      tag: 'header',
      classNames: ['header'],
      innerHTML : ['<div class="logo">', '<div class="logo__ico">', '</div>', '<div class="logo__title">', 'CSS Diner', '</div>', '</div>', '<div class="help">', '</div>'],
      callback: null,
    }

    const headerCreator = new CreatorElement(headerParam);
    console.log(headerCreator);

    return headerCreator;
  }
}