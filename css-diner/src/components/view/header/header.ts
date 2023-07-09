import './header.css';
import CreatorElement, { ElementParam } from '../../creator/creator';
import { View } from '../../creator/view';

class btnWrapperCreatorView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

class logoCreatorView extends View {
  constructor(param: ElementParam) {
    super(param);
  }
}

export class HeaderView extends View {
  reloadCreator: HTMLElement | null = null;
  helpCreator: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.reloadCreator = new CreatorElement({ tag: 'div', classNames: ['reload'] }).getElement();
    this.helpCreator = new CreatorElement({ tag: 'div', classNames: ['help'] }).getElement();
    const logoCreator = new logoCreatorView({ tag: 'div', classNames: ['logo'] });
    logoCreator.appendElems([
      { tag: 'div', classNames: ['logo__ico'] },
      { tag: 'div', classNames: ['logo__title'], innerText: 'CSS Diner' },
    ]);
    const btnWrapperCreator = new btnWrapperCreatorView({ tag: 'div', classNames: ['btn__wrapper'] });
    btnWrapperCreator.appendElems([this.reloadCreator, this.helpCreator]);
    this.view.getElement()?.prepend(logoCreator.getHTMLElement(), btnWrapperCreator.getHTMLElement());
  }
}
