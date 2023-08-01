import './header.css';
import CreatorElement from '../../creator/creator';
import { View } from '../../creator/view';
import { ElementParam } from '../../../types/creator/creator';

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
  reloadCreator!: HTMLElement;
  helpCreator!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.reloadCreator = new CreatorElement({ classNames: ['reload'] }).getElement();
    this.helpCreator = new CreatorElement({ classNames: ['help'] }).getElement();
    const logoCreator = new logoCreatorView({ classNames: ['logo'] });
    logoCreator.appendElems([{ classNames: ['logo__ico'] }, { classNames: ['logo__title'], innerText: 'CSS Diner' }]);
    const btnWrapperCreator = new btnWrapperCreatorView({ classNames: ['btn__wrapper'] });
    btnWrapperCreator.appendElems([this.reloadCreator, this.helpCreator]);
    this.view.getElement()?.prepend(logoCreator.getHTMLElement(), btnWrapperCreator.getHTMLElement());
  }
}
