import { FooterView } from "../view/footer/footer";
import { HeaderView } from "../view/header/header";
import { MainView } from "../view/main/main";

export class App {
  constructor() {
    this.createView();
  }

  createView() {
    const footerView = new FooterView();
    console.log(footerView);
    // document.body.append(footerView.getHTMLElement())
    const footerElement = footerView.getHTMLElement();
    if (footerElement) {
      document.body.prepend(footerElement);
    }

    
    const mainView = new MainView();
    const mainElement = mainView.getHTMLElement();
    if (mainElement) {
      document.body.prepend(mainElement);
    }
    
    const headerView = new HeaderView();
    const headerElement = headerView.getHTMLElement();
    if (headerElement) {
      document.body.prepend(headerElement);
    }

  }
}