interface ElemView {
  tag: string,
  classNames: Array<string>,
}

class ViewElement {
  elem: ElemView;
  constructor(elem = { tag: 'div', classNames: [] }) {
    this.viewElement = this.createElementView(elem);
  }

  getHtmlElement() {
    return this.viewElement.getElement();
  }

  createView(params) {

    const elementParams = {
        tag: params.tag,
        classNames: params.classNames,
        textContent: '',
        callback: null,
    };
    this.viewElementCreator = new ElementCreator(elementParams);

    return this.viewElementCreator;
  }
}