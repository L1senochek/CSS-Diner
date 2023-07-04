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
  // private headerView: CreatorElement;
  // view - от родителя
  reloadCreator: HTMLElement | null = null;
  helpCreator: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param)
    // this.headerView = this.createCreate(); 
    this.changeView() ;
  }

  getHTMLElement() {
    return this.view.getElement();
  }

  // ChangeView или наполни вью
  changeView() {
    // const creator = new ElementFilled();
    // const headerParam = creator.createDiv('header', ['header']);
    // const headerLogo = creator.createDiv('div', ['logo']);
    // const headerLogoIco = creator.createDiv('div', ['logo__ico']);
    // const headerLogoTitle = creator.createDiv('div', ['logo__title'], 'CSS Diner');
    // const headerBtnWrapper = creator.createDiv('div', ['btn__wrapper']);
    // const headerReload = creator.createDiv('div', ['reload']);
    // const headerHelp = creator.createDiv('div', ['help']);

    // Хедер креэйтор это this.view
    // const headerCreator = new CreatorElement({tag: 'header', classNames: ['header']});


    // const logoCreator = new CreatorElement({tag: 'div', classNames: ['logo']}).getElement();
    // const logoIcoCreator = new CreatorElement({tag: 'div', classNames: ['logo__ico']}).getElement();
    // const logoTitleCreator = new CreatorElement({tag: 'div', classNames: ['logo__title'], innerText: 'CSS Diner'}).getElement();
    // const btnWrapperCreator = new CreatorElement({tag: 'div', classNames: ['btn__wrapper']}).getElement();
    this.reloadCreator = new CreatorElement({tag: 'div', classNames: ['reload']}).getElement();
    this.helpCreator = new CreatorElement({tag: 'div', classNames: ['help']}).getElement();
  
    const logoCreator = new logoCreatorView({tag: 'div', classNames: ['logo']});
    logoCreator.appendElems([{tag: 'div', classNames: ['logo__ico']}, {tag: 'div', classNames: ['logo__title'], innerText: 'CSS Diner'}])

    const btnWrapperCreator = new btnWrapperCreatorView({tag: 'div', classNames: ['btn__wrapper']});
    btnWrapperCreator.appendElems([{tag: 'div', classNames: ['reload']}, {tag: 'div', classNames: ['help']}]);

    
    
    // this.добавь в начало ({tag: 'div', classNames: ['help']})
    // this.добавь в начало ({tag: 'div', classNames: ['help']})
    // this.добавь в конец ({tag: 'div', classNames: ['help']})
    // this.добавь в конец ({tag: 'div', classNames: ['help']})
    // if (this.reloadCreator && this.helpCreator) {
    //   btnWrapperCreator?.prepend(this.reloadCreator, this.helpCreator);
    // }

    // if (logoIcoCreator && logoTitleCreator) {
    //   logoCreator?.prepend(logoIcoCreator,logoTitleCreator);
    // }

    if (logoCreator && btnWrapperCreator) {
      this.view.getElement()?.prepend(logoCreator.getHTMLElement(), btnWrapperCreator.getHTMLElement());
    }
    console.log(this.view.getElement())
    //возвращать не надо
    // return headerCreator;

    // добавь в начало родителя елем (параметр) {
     // const елем = new CreatorElem(параметр).getElement();
     // this.view.prepend(елем)
    // } 
    
  }
}
