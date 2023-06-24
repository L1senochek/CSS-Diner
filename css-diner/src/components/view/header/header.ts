import CreatorElement from "../../creator/creator";

const headerParam = {
  tag: 'header',
  classNames: ['header'],
  innerText: '',
  callback: null,
}

const headerLogo = {
  tag: 'div',
  classNames: ['logo'],
  innerText: '',
  callback: null,
}

const headerLogoIco = {
  tag: 'div',
  classNames: ['logo__ico'],
  innerText: '',
  callback: null,
}

const headerLogoTitle = {
  tag: 'div',
  classNames: ['logo__title'],
  innerText: 'CSS Diner',
  callback: null,
}

const headerHelp = {
  tag: 'div',
  classNames: ['help'],
  innerText: '',
  callback: null,
}

export class HeaderView {
  headerView: CreatorElement;
  constructor() {
    this.headerView = this.createHeader();
  }

  getHTMLElement() {
    return this.headerView.getElement();
  }

  createHeader() {
    const headerCreator = new CreatorElement(headerParam);
    const logoCreator = new CreatorElement(headerLogo).getElement();
    const logoIcoCreator = new CreatorElement(headerLogoIco).getElement();
    const logoTitleCreator = new CreatorElement(headerLogoTitle).getElement();
    const helpCreator = new CreatorElement(headerHelp).getElement();
    
    if (logoIcoCreator instanceof Node && logoTitleCreator instanceof Node) {
      logoCreator?.prepend(logoIcoCreator, logoTitleCreator);
    }

    if (logoCreator instanceof Node && helpCreator instanceof Node) {
      headerCreator.getElement()?.prepend(logoCreator, helpCreator);
    }
    
    return headerCreator;
  }

  createInnerStructure() {}
}