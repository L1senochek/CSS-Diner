import CreatorElement from '../../../creator/creator';
import { View } from '../../../creator/view';
import './lvl.css';
import lvlJSON from '../../../data/levels.json';
import { LvlStatus, StatusToogleRemove } from '../../../../types/app/app';
import { ElementParam, Callback } from '../../../../types/creator/creator';

class DescriptionHintView extends View {
  hintContent!: HTMLElement;
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
    const hintCat = new CreatorElement({ classNames: ['hint__cat'], innerText: ' > ω < ' });
    this.hintContent = new CreatorElement({ classNames: ['hint__content'], innerText: '' }).getElement();
    hintWrapper.getElement().prepend(hintCat.getElement(), this.hintContent);
    this.view.getElement().prepend(earWrapper.getElement(), hintWrapper.getElement());
  }
}

class DescriptionCreatorView extends View {
  descriptionSelector!: HTMLElement;
  descriptionTitle!: HTMLElement;
  descriptionSyntax!: HTMLElement;
  lvlExample!: HTMLElement;
  hintWrapper!: HTMLElement;
  hintContent!: HTMLElement;
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
    this.lvlExample = new CreatorElement({ classNames: ['lvl__example'], innerText: '' }).getElement();
    const descriptionHint = new DescriptionHintView({ classNames: ['description__hint'], innerText: '' });
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
  lvlTitle!: HTMLElement;
  lvlCheckmark!: HTMLElement;
  lvlNavPrev!: HTMLElement;
  lvlNavNext!: HTMLElement;
  burger!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.lvlTitle = new CreatorElement({ tag: 'h2', classNames: ['lvl__title'], innerText: '' }).getElement();
    this.lvlCheckmark = new CreatorElement({ tag: 'span', classNames: ['lvl__checkmark'], innerText: '' }).getElement();
    const lvlNav = new CreatorElement({ classNames: ['lvl__nav'], innerText: '' }).getElement();
    this.lvlNavPrev = new CreatorElement({ tag: 'span', classNames: ['arrow__prev'], innerText: '' }).getElement();
    this.lvlNavNext = new CreatorElement({ tag: 'span', classNames: ['arrow__next'], innerText: '' }).getElement();
    this.burger = new CreatorElement({ classNames: ['burger'], innerText: '' }).getElement();
    const burgerLine = new CreatorElement({ classNames: ['burger__line'], innerText: '' }).getElement();
    lvlNav.prepend(this.lvlNavPrev, this.lvlNavNext);
    this.burger.prepend(burgerLine);
    this.view.getElement().prepend(this.lvlTitle, this.lvlCheckmark, lvlNav, this.burger);
  }
}

export class ProgressBarView extends View {
  lvlProgress!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.lvlProgress = new CreatorElement({ classNames: ['lvl__progress'], innerText: '' }).getElement();
    this.view.getElement().append(this.lvlProgress);
  }
}

export class LvlAboutView extends View {
  lvlTitle!: TitleLvlView;
  description!: DescriptionCreatorView;
  lvlProgress!: HTMLElement;
  hintWrapper!: HTMLElement;
  hintContent!: HTMLElement;
  curtainBurger!: HTMLElement;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    const titleView = new TitleLvlView({ classNames: ['lvl__wrapper'], innerText: '' });
    this.lvlTitle = titleView;
    const progressBar = new ProgressBarView({ classNames: ['lvl__progress-bar'], innerText: '' });
    this.description = new DescriptionCreatorView({
      classNames: ['lvl__description', 'description'],
      innerText: '',
    });
    this.lvlProgress = progressBar.lvlProgress;
    this.hintWrapper = this.description.hintWrapper;
    this.hintContent = this.description.hintContent;
    this.curtainBurger = new CreatorElement({
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

  changeCheckmark(lvlRes: LvlStatus[], lvl: number): void {
    if (lvlRes[lvl] === LvlStatus.STATUS_COMPLETED) {
      this.lvlTitle.lvlCheckmark.classList.add('completed');
      this.lvlTitle.lvlCheckmark.classList.remove('with-hint');
    } else if (lvlRes[lvl] === LvlStatus.STATUS_NOT_COMPLETED) {
      this.lvlTitle.lvlCheckmark.classList.remove('completed');
      this.lvlTitle.lvlCheckmark.classList.remove('with-hint');
    } else if (lvlRes[lvl] === LvlStatus.STATUS_COMPLETED_WITH_HINT) {
      this.lvlTitle.lvlCheckmark.classList.remove('completed');
      this.lvlTitle.lvlCheckmark.classList.add('with-hint');
    }
  }

  nextLvl(lvl: number, renderLvl: Callback<number>): void {
    renderLvl(lvl);
  }

  prevLvl(lvl: number, renderLvl: Callback<number>): void {
    renderLvl(lvl);
  }

  toLvl(lvl: number, renderLvl: Callback<number>): void {
    renderLvl(lvl);
  }

  changeAboutLvl(lvlRes: LvlStatus[], lvl: number): void {
    this.changeCheckmark(lvlRes, lvl);
    this.lvlTitle.lvlTitle.innerText = `Level ${lvl + 1} of ${lvlJSON.length}`;
    this.description.descriptionSelector.innerText = `${lvlJSON[lvl].selectorName}`;
    this.description.descriptionTitle.innerText = `${lvlJSON[lvl].title}`;
    this.description.descriptionSyntax.innerText = `${lvlJSON[lvl].syntax}`;
    this.description.lvlExample.innerHTML = `${lvlJSON[lvl].examples}`;
    this.description.hintContent.innerText = `${lvlJSON[lvl].hint}`;
  }

  changeProgressBar(num: number): void {
    if (this.lvlProgress instanceof HTMLElement) {
      this.lvlProgress.style.width = `${((num + 1) / lvlJSON.length) * 100}%`;
    }
  }

  createCurtainBurgerItem(lvlRes: LvlStatus[], curLvl: number): void {
    lvlJSON.forEach((lvl) => {
      const li = document.createElement('li');
      const lvlStatus = lvlRes[lvl.id - 1];
      li.classList.add('curtain-burger__item');
      if (lvlStatus === LvlStatus.STATUS_COMPLETED) {
        li.innerHTML = `<span class='lvl__checkmark completed'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      } else if (lvlStatus === LvlStatus.STATUS_COMPLETED_WITH_HINT) {
        li.innerHTML = `<span class='lvl__checkmark with-hint'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      } else {
        li.innerHTML = `<span class='lvl__checkmark'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      }
      if (curLvl === lvl.id - 1) {
        li.classList.add('active');
      }
      this.curtainBurger.append(li);
    });
  }

  changeBurgerClass(status: StatusToogleRemove.TOOGLE | StatusToogleRemove.REMOVE) {
    if (status === StatusToogleRemove.TOOGLE) {
      this.lvlTitle.burger.classList.toggle('active');
      this.curtainBurger.classList.toggle('active');
    } else if (status === StatusToogleRemove.REMOVE) {
      this.lvlTitle.burger.classList.remove('active');
      this.curtainBurger.classList.remove('active');
    }
    if (this.curtainBurger instanceof HTMLElement) {
      this.curtainBurger.innerHTML = '';
    }
  }

  changeLvlOnTarget(lvl: number, renderLvl: Callback<number>): void {
    this.toLvl(lvl, renderLvl);
  }
}
