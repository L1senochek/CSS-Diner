export type Callback<T> = (data?: T) => void;

export interface ElementParam {
  tag: string,
  classNames: Array<string>,
  textContent: string,
  callback: Callback<Event> | null,
}

export default class CreatorElement {
  elem: HTMLElement | null;

  constructor(param: ElementParam) {
    this.elem = null;
    this.createElem(param);
  }

  // /**
  //  * @returns {HTMLElement}
  //  */
  // getElement() {
  //   return this.elem;
  // }

  // /**
  //  * @param {HTMLElement | ElementCreator} element
  //  */
  // addInnerElement(element) {
  //   if (element instanceof ElementCreator) {
  //     this.elem.append(element.getElement());
  //   } else {
  //     this.elem.append(element);
  //   }
  // }

  /**
   * @param {Elementparam} param
   */


  getElement() {
    return this.elem;
  }


  createElem(param: ElementParam) {
    this.elem = document.createElement(param.tag);
    // if (this.elem instanceof HTMLElement) {
      // this.setCssClasses(param.classNames);
    console.log(this.elem);

    param.classNames.map((cssClass) => {
      if (this.elem instanceof HTMLElement) {
        this.elem.classList.add(cssClass);
      }
    });
      

      // param.classNames.forEach(cssClass => {
      //   this.elem.classList.add(cssClass);
      // });


    this.elem.textContent = param.textContent;
    console.log(this.elem);

      // this.setCallback(param.callback); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // }
    
    
  }

  // /**
  //  * @param {Array<string>} cssClasses
  //  */
  // setCssClasses(cssClasses = []) {
  //   cssClasses.map((cssClass) => this.elem.classList.add(cssClass));
  // }

  // /**
  // //  * @param {string} text
  // //  */
  // setTextContent(text = '') {
  //   this.elem.textContent = text;
  // }

  // /**
  //  * @param {function} callback
  //  */
  // setCallback(callback) {
  //   if (typeof callback === 'function') {
  //     this.elem.addEventListener('click', (event) => callback(event));
  //   }
  // }
}