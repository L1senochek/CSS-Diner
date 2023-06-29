import CreatorElement from "../../creator/creator";
import { ElementFilled } from "../../creator/fillDiv";
import './header.css';

export class HeaderView {
  headerView: CreatorElement;
  constructor() {
    this.headerView = this.createHeader();
  }

  getHTMLElement() {
    return this.headerView.getElement();
  }

  createHeader() {
    const creator = new ElementFilled();
    const headerParam = creator.createDiv('header', ['header']);
    const headerLogo = creator.createDiv('div', ['logo']);
    const headerLogoIco = creator.createDiv('div', ['logo__ico']);
    const headerLogoTitle = creator.createDiv('div', ['logo__title'], 'CSS Diner');
    const headerHelp = creator.createDiv('div', ['help']);
    const headerCreator = new CreatorElement(headerParam);
    const logoCreator = new CreatorElement(headerLogo).getElement();
    const logoIcoCreator = new CreatorElement(headerLogoIco).getElement();
    const logoTitleCreator = new CreatorElement(headerLogoTitle).getElement();
    const helpCreator = new CreatorElement(headerHelp).getElement();
    
    if (logoIcoCreator && logoTitleCreator) {
      logoCreator?.prepend(logoIcoCreator, logoTitleCreator);
    }

    if (logoCreator && helpCreator) {
      headerCreator.getElement()?.prepend(logoCreator, helpCreator);
    }
    
    return headerCreator;
  }

  createInnerStructure() {}
}
