// create app

import { FooterView } from "../view/footer/footer";

export class App {
  constructor() {
    this.createView();
  }

  createView() {
    const footerView = new FooterView();
    console.log(footerView);
    document.body.append(footerView.getHTMLElement() as Node)
  }
}