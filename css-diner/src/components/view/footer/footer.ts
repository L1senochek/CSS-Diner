import CreatorElement from "../../creator/creator";

// export interface ElementParam {
//   tag: string,
//   classNames: Array<string>,
//   textContent: string,
//   callback: Callback<Event>,
// }

const footerParam = {
  tag: 'footer',
  classNames: ['footer'],
  innerText: '',
  callback: null,
}

const footerLogoRS = {
  tag: 'div',
  classNames: ['footer__logo', 'rsschool'],
  innerText: '',
  callback: null,
}

const footerLogoGithub = {
  tag: 'div',
  classNames: ['footer__logo', 'github'],
  innerText: '',
  callback: null,
}

export class FooterView {
  footerView: CreatorElement;
  constructor() {
    this.footerView = this.createFooter();
  }

  getHTMLElement() {
    return this.footerView.getElement();
  }

  createFooter() {
    const footerCreator = new CreatorElement(footerParam);
    const logoRSCreator = new CreatorElement(footerLogoRS).getElement();
    const logoGithubCreator = new CreatorElement(footerLogoGithub).getElement();

    if (logoRSCreator && logoGithubCreator) {
      footerCreator.getElement()?.prepend(logoRSCreator, logoGithubCreator);
    }

    return footerCreator;
  }
}