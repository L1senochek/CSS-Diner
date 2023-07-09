import CreatorElement, { ElementParam } from '../../../creator/creator';
import { View } from '../../../creator/view';
import './lvl.css';

class DescriptionHintView extends View {
  hintContent: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    const earWrapper = new CreatorElement({ tag: 'span', classNames: ['hint__ear_wrapper'], innerText: '' });
    const hintLeftEar = new CreatorElement({ tag: 'span', classNames: ['hint__left-ear'], innerText: '' });
    const hintRightEar = new CreatorElement({ tag: 'span', classNames: ['hint__right-ear'], innerText: '' });
    earWrapper.getElement().prepend(hintLeftEar.getElement(), hintRightEar.getElement());
    const hintWrapper = new CreatorElement({ tag: 'span', classNames: ['hint__wrapper'], innerText: '' });
    const hintCat = new CreatorElement({ tag: 'div', classNames: ['hint__cat'], innerText: ' > ω < ' });
    this.hintContent = new CreatorElement({ tag: 'div', classNames: ['hint__content'], innerText: '' }).getElement();
    hintWrapper.getElement().prepend(hintCat.getElement(), this.hintContent);
    this.view.getElement().prepend(earWrapper.getElement(), hintWrapper.getElement());
  }
}

class DescriptionCreatorView extends View {
  descriptionSelector: HTMLElement | null = null;
  descriptionTitle: HTMLElement | null = null;
  descriptionSyntax: HTMLElement | null = null;
  lvlExample: HTMLElement | null = null;
  hintWrapper: HTMLElement | null = null;
  hintContent: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.descriptionSelector = new CreatorElement({
      tag: 'h3',
      classNames: ['description__selector-name'],
      innerText: 'Type Selector',
    }).getElement();
    this.descriptionTitle = new CreatorElement({
      tag: 'h3',
      classNames: ['description__title'],
      innerText: 'Select elements by their type',
    }).getElement();
    this.descriptionSyntax = new CreatorElement({
      tag: 'h2',
      classNames: ['description__syntax', 'highlight'],
      innerText: 'A',
    }).getElement();
    const descriptionExamples = new CreatorElement({ tag: 'h3', classNames: ['lvl__examples'], innerText: 'Examples' });
    this.lvlExample = new CreatorElement({ tag: 'div', classNames: ['lvl__example'], innerText: '' }).getElement();
    const descriptionHint = new DescriptionHintView({ tag: 'div', classNames: ['description__hint'], innerText: '' });
    this.hintWrapper = descriptionHint.getHTMLElement();
    this.hintContent = descriptionHint.hintContent;
    this.view
      .getElement()
      .prepend(
        this.descriptionSelector,
        this.descriptionTitle,
        this.descriptionSyntax,
        descriptionExamples.getElement(),
        this.lvlExample,
        descriptionHint.getHTMLElement()
      );
  }
}

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

  private changeView(): void {
    this.lvlTitle = new CreatorElement({ tag: 'h2', classNames: ['lvl__title'], innerText: '' }).getElement();
    this.lvlCheckmark = new CreatorElement({ tag: 'span', classNames: ['lvl__checkmark'], innerText: '' }).getElement();
    const lvlNav = new CreatorElement({ tag: 'div', classNames: ['lvl__nav'], innerText: '' }).getElement();
    this.lvlNavPrev = new CreatorElement({ tag: 'span', classNames: ['arrow__prev'], innerText: '' }).getElement();
    this.lvlNavNext = new CreatorElement({ tag: 'span', classNames: ['arrow__next'], innerText: '' }).getElement();
    this.burger = new CreatorElement({ tag: 'div', classNames: ['burger'], innerText: '' }).getElement();
    const burgerLine = new CreatorElement({ tag: 'div', classNames: ['burger__line'], innerText: '' }).getElement();
    lvlNav.prepend(this.lvlNavPrev, this.lvlNavNext);
    this.burger.prepend(burgerLine);
    this.view.getElement().prepend(this.lvlTitle, this.lvlCheckmark, lvlNav, this.burger);
  }
}

export class ProgressBarView extends View {
  lvlProgress: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.lvlProgress = new CreatorElement({ tag: 'div', classNames: ['lvl__progress'], innerText: '' }).getElement();
    this.view.getElement().append(this.lvlProgress);
  }
}

export class LvlAboutView extends View {
  lvlTitle: TitleLvlView | null = null;
  description: DescriptionCreatorView | null = null;
  lvlProgress: HTMLElement | null = null;
  hintWrapper: HTMLElement | null = null;
  hintContent: HTMLElement | null = null;
  curtainBurger: HTMLElement | null = null;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    const titleView = new TitleLvlView({ tag: 'div', classNames: ['lvl__wrapper'], innerText: '' });
    this.lvlTitle = titleView;
    const progressBar = new ProgressBarView({ tag: 'div', classNames: ['lvl__progress-bar'], innerText: '' });
    this.description = new DescriptionCreatorView({
      tag: 'div',
      classNames: ['lvl__description', 'description'],
      innerText: '',
    });
    this.lvlProgress = progressBar.lvlProgress;
    this.hintWrapper = this.description.hintWrapper;
    this.hintContent = this.description.hintContent;
    this.curtainBurger = new CreatorElement({
      tag: 'div',
      classNames: ['lvl__curtain-burger'],
      innerText: '',
    }).getElement();
    this.view
      .getElement()
      .prepend(
        titleView.getHTMLElement(),
        progressBar.getHTMLElement(),
        this.description.getHTMLElement(),
        this.curtainBurger
      );
  }
}
