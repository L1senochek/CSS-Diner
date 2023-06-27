export type Callback<T> = (data?: T) => void;

export interface ElementParam {
  tag: string,
  classNames: string[],
  innerText?: string,
  // innerHTML: string[],
  callback?: Callback<Event> | null,
  attributes?: {
    type: string,
    placeholder: string,
  },
}

export default class CreatorElement {
  elem: HTMLElement | null;

  constructor(param: ElementParam) {
    this.elem = null;
    this.createElem(param);
  }

  getElement() {
    return this.elem;
  }

  createElem(param: ElementParam) {
    this.elem = document.createElement(param.tag);

    param.classNames.map((cssClass) => {
      if (this.elem instanceof HTMLElement) this.elem.classList.add(cssClass);
    });

    if (param.innerText !== undefined) this.elem.innerText = param.innerText;
    
    if (param.attributes) {
      const { type, placeholder } = param.attributes;
      this.elem.setAttribute('type', type);
      this.elem.setAttribute('placeholder', placeholder);
    }
    // this.elem.innerHTML = param.innerHTML.join('');
  }
}
