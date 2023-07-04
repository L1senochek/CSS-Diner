import CreatorElement, { ElementParam } from "./creator";

export class View {
  protected view: CreatorElement;

  constructor(param: ElementParam) {
    this.view = this.createView(param);
  }

  getHTMLElement() {
    return this.view.getElement();
  }

  createView(param: ElementParam) {
    return new CreatorElement(param);
  }

  getPropertyElem(param: HTMLElement | null): HTMLElement {
    if (param instanceof HTMLElement) {
      return param
    } else {
      console.log(param, 'error')
      throw new Error;
    }
  }

  appendElems([...elem]) {
    [...elem].forEach(element => {
      const mainElem = new CreatorElement(element);
      this.view.getElement().append(mainElem.getElement());
    });
  }
}