

// export interface ElementParam {
//   tag: string,
//   classNames: Array<string>,
//   textContent: string,
//   callback: Callback<Event>,
// }

import CreatorElement from "../../creator/creator";



export class FooterView {
  footerView: CreatorElement;
  constructor() {
    this.footerView = this.createFooter();
  }

  getHTMLElement() {
    return this.footerView.getElement();
  }

  createFooter() {
    const footerParam = {
      tag: 'footer',
      classNames: ['footer'],
      textContent : '<div class="footer__logo rsschool"></div><div class="footer__logo github"></div>',
      callback: null,
    }

    const footerCreator = new CreatorElement(footerParam);
    console.log(footerCreator);

    return footerCreator;
  }
}