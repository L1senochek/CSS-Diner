import './header.css';
import CreatorElement, { ElementParam } from '../../creator/creator';
import { View } from '../../creator/view';

class btnWrapperCreatorView extends View {
  constructor(param: ElementParam) {
    super(param) 
  }
}

class logoCreatorView extends View {
  constructor(param: ElementParam) {
    super(param) 
  }
}

export class HeaderView extends View {
  // view - от родителя
  reloadCreator: HTMLElement | null = null;
  helpCreator: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    // this.headerView = this.createCreate(); 
    this.changeView();
  }

  // ChangeView или наполни вью
  changeView() {
    this.reloadCreator = new CreatorElement({tag: 'div', classNames: ['reload']}).getElement();
    this.helpCreator = new CreatorElement({tag: 'div', classNames: ['help']}).getElement();
  
    const logoCreator = new logoCreatorView({tag: 'div', classNames: ['logo']});
    logoCreator.appendElems([{tag: 'div', classNames: ['logo__ico']}, {tag: 'div', classNames: ['logo__title'], innerText: 'CSS Diner'}])

    const btnWrapperCreator = new btnWrapperCreatorView({tag: 'div', classNames: ['btn__wrapper']});
    btnWrapperCreator.appendElems([this.reloadCreator, this.helpCreator]);

    // btnWrapperCreator.appendElem(this.reloadCreator)
    // btnWrapperCreator.appendElem(this.helpCreator)

    // if (logoCreator && btnWrapperCreator) {
    this.view.getElement()?.prepend(logoCreator.getHTMLElement(), btnWrapperCreator.getHTMLElement());
    // }
    // this.view.appendElems([logoCreator.getHTMLElement(), btnWrapperCreator.getHTMLElement()]);
    console.log(this.view.getElement())
    // добавь в начало родителя елем (параметр) {
     // const елем = new CreatorElem(параметр).getElement();
     // this.view.prepend(елем)
    // } 
  }
}
