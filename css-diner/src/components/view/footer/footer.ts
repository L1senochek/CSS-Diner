import CreatorElement from '../../creator/creator';
import { ElementFilled } from '../../creator/fillDiv';

export class FooterView {
  footerView: CreatorElement;
  constructor() {
    this.footerView = this.createFooter();
  }

  getHTMLElement() {
    return this.footerView.getElement();
  }

  createFooter() {
    const creator = new ElementFilled();
    const footerParam = creator.createDiv('footer', ['footer']);
    const footerLogoRS = creator.createDiv('div', ['footer__logo', 'rsschool']);
    const footerLogoGithub = creator.createDiv('div', ['footer__logo', 'github']);
    const footerCreator = new CreatorElement(footerParam);
    const logoRSCreator = new CreatorElement(footerLogoRS).getElement();
    const logoGithubCreator = new CreatorElement(footerLogoGithub).getElement();

    if (logoRSCreator && logoGithubCreator) {
      footerCreator.getElement()?.prepend(logoRSCreator, logoGithubCreator);
    }

    return footerCreator;
  }
}
