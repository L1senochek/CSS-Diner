import CreatorElement, { ElementParam } from '../../../creator/creator';
import { ElementFilled } from '../../../creator/fillDiv';
import { View } from '../../../creator/view';
import './lvl.css';

export class LvlAboutView {
  lvlAboutView: CreatorElement;
  constructor() {
    this.lvlAboutView = this.createLvlAbout();
  }

  getHTMLElement() {
    return this.lvlAboutView.getElement();
  }

  createLvlAbout() {
    const creator = new ElementFilled();
    const lvlParam = creator.createDiv('div', ['lvl__about'], '');

    const lvlWrapper = creator.createDiv('div', ['lvl__wrapper'], '');
    const lvlTitle = creator.createDiv('h2', ['lvl__title'], '');
    const lvlCheckmark = creator.createDiv('span', ['lvl__checkmark'], '');
    const lvlNav = creator.createDiv('div', ['lvl__nav'], '');
    const lvlNavPrev = creator.createDiv('span', ['arrow__prev'], '');
    const lvlNavNext = creator.createDiv('span', ['arrow__next'], '');
    const burger = creator.createDiv('div', ['burger'], '');
    const burgerLine = creator.createDiv('div', ['burger__line'], '');

    const lvlProgressBar = creator.createDiv('div', ['lvl__progress-bar'], '');
    const lvlProgress = creator.createDiv('div', ['lvl__progress'], '');
    const lvlDescription = creator.createDiv('div', ['lvl__description', 'description'], '');
    const descriptionSelector = creator.createDiv('h3', ['description__selector-name'], 'Type Selector');
    const descriptionTitle = creator.createDiv('h3', ['description__title'], 'Select elements by their type');
    const descriptionSyntax = creator.createDiv('h2', ['description__syntax', 'highlight'], 'A');
    const descriptionExamples = creator.createDiv('h3', ['lvl__examples'], 'Examples');
    const lvlExample = creator.createDiv('div', ['lvl__example'], '');
    const descriptionHint = creator.createDiv('div', ['description__hint'], '');
    const earWrapper = creator.createDiv('span', ['hint__ear_wrapper'], '');
    const hintLeftEar = creator.createDiv('span', ['hint__left-ear'], '');
    const hintRightEar = creator.createDiv('span', ['hint__right-ear'], '');
    const hintWrapper = creator.createDiv('div', ['hint__wrapper'], '');
    const hintCat = creator.createDiv('div', ['hint__cat'], ' > ω < ');
    const hintContent = creator.createDiv('div', ['hint__content'], '');
    const curtain = creator.createDiv('div', ['lvl__curtain-burger'], '');

    const lvlCreator = new CreatorElement(lvlParam);
    const lvlWrapperCreator = new CreatorElement(lvlWrapper).getElement();
    const lvlTitleCreator = new CreatorElement(lvlTitle).getElement();
    const lvlCheckmarkCreator = new CreatorElement(lvlCheckmark).getElement();
    const lvlNavCreator = new CreatorElement(lvlNav).getElement();
    const lvlNavPrevCreator = new CreatorElement(lvlNavPrev).getElement();
    const lvlNavNextCreator = new CreatorElement(lvlNavNext).getElement();
    const burgerCreator = new CreatorElement(burger).getElement();
    const burgerLineCreator = new CreatorElement(burgerLine).getElement();
    const lvlProgressBarCreator = new CreatorElement(lvlProgressBar).getElement();
    const lvlProgressCreator = new CreatorElement(lvlProgress).getElement();
    const lvlDescriptionCreator = new CreatorElement(lvlDescription).getElement();
    const descriptionSelectorCreator = new CreatorElement(descriptionSelector).getElement();
    const descriptionTitleCreator = new CreatorElement(descriptionTitle).getElement();
    const descriptionSyntaxCreator = new CreatorElement(descriptionSyntax).getElement();
    const descriptionHintCreator = new CreatorElement(descriptionHint).getElement();
    const earWrapperCreator = new CreatorElement(earWrapper).getElement();
    const hintLeftEarCreator = new CreatorElement(hintLeftEar).getElement();
    const hintRightEarCreator = new CreatorElement(hintRightEar).getElement();
    const hintWrapperCreator = new CreatorElement(hintWrapper).getElement();
    const hintCatCreator = new CreatorElement(hintCat).getElement();
    const hintContentCreator = new CreatorElement(hintContent).getElement();
    const descriptionExamplesCreator = new CreatorElement(descriptionExamples).getElement();
    const lvlExampleCreator = new CreatorElement(lvlExample).getElement();
    const lvlcurtainCreator = new CreatorElement(curtain).getElement();

    if (lvlNavPrevCreator && lvlNavNextCreator) lvlNavCreator?.prepend(lvlNavPrevCreator, lvlNavNextCreator);
    if (burgerLineCreator) burgerCreator?.prepend(burgerLineCreator);
    if (lvlTitleCreator && lvlCheckmarkCreator && lvlNavCreator && burgerCreator) {
      lvlWrapperCreator?.prepend(lvlTitleCreator, lvlCheckmarkCreator, lvlNavCreator, burgerCreator);
    }
    if (hintLeftEarCreator && hintRightEarCreator) {
      earWrapperCreator?.prepend(hintLeftEarCreator, hintRightEarCreator);
    }

    if (hintWrapperCreator && hintCatCreator && hintContentCreator) {
      hintWrapperCreator?.prepend(hintCatCreator, hintContentCreator);
    }
    if (earWrapperCreator && hintWrapperCreator) {
      descriptionHintCreator?.prepend(earWrapperCreator, hintWrapperCreator);
    }
    if (lvlProgressCreator) lvlProgressBarCreator?.prepend(lvlProgressCreator);
    if (
      descriptionSelectorCreator &&
      descriptionTitleCreator &&
      descriptionSyntaxCreator &&
      descriptionExamplesCreator &&
      lvlExampleCreator &&
      descriptionHintCreator
    ) {
      lvlDescriptionCreator?.prepend(
        descriptionSelectorCreator,
        descriptionTitleCreator,
        descriptionSyntaxCreator,
        descriptionExamplesCreator,
        lvlExampleCreator,
        descriptionHintCreator
      );
    }
    if (
      lvlCreator &&
      lvlWrapperCreator instanceof Node &&
      lvlProgressBarCreator instanceof Node &&
      lvlDescriptionCreator instanceof Node &&
      lvlcurtainCreator
    ) {
      lvlCreator
        .getElement()
        ?.prepend(lvlWrapperCreator, lvlProgressBarCreator, lvlDescriptionCreator, lvlcurtainCreator);
    }
    return lvlCreator;
  }
}

class DescriptionHintView extends View {
  hintContent: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }
  
  changeView() {
    const earWrapper = new CreatorElement({tag: 'span', classNames: ['hint__ear_wrapper'], innerText: ''});
    const hintLeftEar = new CreatorElement({tag: 'span', classNames: ['hint__left-ear'], innerText: ''});
    const hintRightEar = new CreatorElement({tag: 'span', classNames: ['hint__right-ear'], innerText: ''});
    earWrapper.getElement().prepend(hintLeftEar.getElement(), hintRightEar.getElement());


    
    const hintWrapper = new CreatorElement({tag: 'span', classNames: ['hint__wrapper'], innerText: ''});
    const hintCat = new CreatorElement({tag: 'div', classNames: ['hint__cat'], innerText: ' > ω < '});
    this.hintContent = new CreatorElement({tag: 'div', classNames: ['hint__content'], innerText: ''}).getElement();
    hintWrapper.getElement().prepend(hintCat.getElement(), this.hintContent); 

    this.view.getElement().prepend(earWrapper.getElement(), hintWrapper.getElement());
  }

}

class DescriptionCreatorView extends View {
  hintContent: HTMLElement | null = null;
  lvlExample: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }
  
  changeView() {
    const descriptionSelector = new CreatorElement({tag: 'h3', classNames: ['description__selector-name'], innerText: 'Type Selector'});
    const descriptionTitle = new CreatorElement({tag: 'h3', classNames: ['description__title'], innerText: 'Select elements by their type'});
    const descriptionSyntax = new CreatorElement({tag: 'h2', classNames: ['description__title'], innerText: 'Select elements by their type'});
    const descriptionExamples = new CreatorElement({tag: 'h3', classNames: ['lvl__examples'] });
    this.lvlExample = new CreatorElement({tag: 'div', classNames: ['lvl__example'], innerText: ''}).getElement();
    const descriptionHint = new DescriptionHintView({tag: 'div', classNames: ['description__hint'], innerText: ''});
    // изменяемый параметр descriptionHint.hintContent
    this.hintContent = descriptionHint.hintContent;

    this.view.getElement().prepend(descriptionSelector.getElement(), descriptionTitle.getElement(), descriptionSyntax.getElement(), descriptionExamples.getElement(), this.lvlExample, descriptionHint.getHTMLElement());
  }

}
/////////////////////////////////////////////

export class TitleLvlView extends View {
  lvlTitle: HTMLElement | null = null;
  lvlCheckmark: HTMLElement | null = null;
  lvlNavPrev: HTMLElement | null = null;
  lvlNavNext: HTMLElement | null = null;
  burger: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
  this.lvlTitle = new CreatorElement({tag: 'h2', classNames: ['lvl__title'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'span', classNames: ['lvl__checkmark'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'div', classNames: ['lvl__nav'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'span', classNames: ['arrow__prev'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'span', classNames: ['arrow__next'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'div', classNames: ['burger'], innerText: ''}).getElement();
  this.lvlTitle = new CreatorElement({tag: 'div', classNames: ['burger__line'], innerText: ''}).getElement();
  return {
    lvlTitle: this.lvlTitle,
    lvlCheckmark: this.lvlCheckmark,
    lvlNavPrev: this.lvlNavPrev,
    lvlNavNext: this.lvlNavNext,
    burger: this.burger
    }
  }
}

export class ProgressBarView extends View {
  lvlProgress: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  changeView() {
    this.lvlProgress = new CreatorElement({ tag: 'div', classNames: ['lvl__progress'], innerText: '' }).getElement();

    this.view.getElement().append(this.lvlProgress);
  }
}


// export class CurtainBurgerView extends View {

// }
  
export class _LvlAboutView extends View {
  lvlTitle: HTMLElement | null = null;
  // 
  description: HTMLElement | null = null;
  //
  lvlProgress: HTMLElement | null = null;
  hintContent: HTMLElement | null = null;
  curtainBurger: HTMLElement | null = null;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }
  
  changeView() {
    const title = new TitleLvlView({tag: 'div', classNames: ['lvl__wrapper'], innerText: ''});
    const progressBar = new ProgressBarView({tag: 'div', classNames: ['lvl__progress-bar'], innerText: ''});
    
    const lvlDescription = new DescriptionCreatorView({tag: 'div', classNames: ['lvl__description', 'description'], innerText: ''});
    
    this.lvlProgress = progressBar.lvlProgress;
    this.hintContent = lvlDescription.hintContent;

    // if (this.lvlTitle instanceof HTMLElement) this.lvlTitle = title;
    this.curtainBurger = new CreatorElement({tag: 'div', classNames: ['lvl__curtain-burger'], innerText: ''}).getElement();


    this.view.getElement().prepend(title.getHTMLElement(), progressBar.getHTMLElement(), lvlDescription.getHTMLElement(), this.curtainBurger);
  }
}