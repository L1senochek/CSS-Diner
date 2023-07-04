import './header.css';
import CreatorElement from '../../creator/creator';
import { ElementFilled } from '../../creator/fillDiv';

export class HeaderView {
  headerView: CreatorElement;
  reloadCreator: HTMLElement | null = null;
  helpCreator: HTMLElement | null = null;
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
    const headerBtnWrapper = creator.createDiv('div', ['btn__wrapper']);
    const headerReload = creator.createDiv('div', ['reload']);
    const headerHelp = creator.createDiv('div', ['help']);
    const headerCreator = new CreatorElement(headerParam);
    const logoCreator = new CreatorElement(headerLogo).getElement();
    const logoIcoCreator = new CreatorElement(headerLogoIco).getElement();
    const logoTitleCreator = new CreatorElement(headerLogoTitle).getElement();
    const btnWrapperCreator = new CreatorElement(headerBtnWrapper).getElement();
    this.reloadCreator = new CreatorElement(headerReload).getElement();
    this.helpCreator = new CreatorElement(headerHelp).getElement();

    if (this.reloadCreator && this.helpCreator) {
      btnWrapperCreator?.prepend(this.reloadCreator, this.helpCreator);
    }

    if (logoIcoCreator && logoTitleCreator) {
      logoCreator?.prepend(logoIcoCreator,logoTitleCreator);
    }

    if (logoCreator && btnWrapperCreator) {
      headerCreator.getElement()?.prepend(logoCreator, btnWrapperCreator);
    }

    return headerCreator;
  }

  getPropertyElem(param: HTMLElement | null): HTMLElement {
    if (param instanceof HTMLElement) {
      return param
    } else {
      throw new Error;
    }
  }
}
