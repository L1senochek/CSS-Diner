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

  // _appendElems([...elem]: ElementParam[]) {
  //   [...elem].forEach(element => {
  //     const mainElem = new CreatorElement(element);
  //     this.view.getElement().append(mainElem.getElement());
  //   });
  // }

  // appendElem(element: HTMLElement){
  //   this.view.getElement().append(element)
  // }

  appendElems([...elem]: (ElementParam | HTMLElement)[]) {
    [...elem].forEach(element => {
      if (element instanceof HTMLElement) {
        this.view.getElement().append(element);
      } else {
        const mainElem = new CreatorElement(element);
        this.view.getElement().append(mainElem.getElement());
      }
    });
  }
}