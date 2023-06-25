import CreatorElement from "../../../creator/creator";

const createDiv = (classNames:string[], innerText: string) => ({
  tag: 'div',
  classNames: classNames,
  innerText: innerText,
  callback: null,
});

export class LvlAboutView {
  lvlAboutView: CreatorElement;
  constructor() {
    this.lvlAboutView = this.createLvlAbout();
  }

  getHTMLElement() {
    return this.lvlAboutView.getElement();
  }

  createLvlAbout() {
    const lvlParam = createDiv(['lvl__about'], '');

    const lvlWrapper = createDiv(['lvl__wrapper'], '');
    const lvlTitle = createDiv(['lvl__title'], 'Level 1 of 32');
    const lvlCheckmark = createDiv(['lvl__checkmark'], '');

    const lvlNav = createDiv(['lvl__nav'], '');
    const lvlNavPrev = createDiv(['arrow__prev'], '');
    const lvlNavNext = createDiv(['arrow__next'], '');

    const lvlProgressBar = createDiv(['lvl__progress-bar'], '');
    const lvlProgress = createDiv(['lvl__progress'], '');

    const lvlDescription = createDiv(['lvl__description', 'description'], '');
    const descriptionSelector = createDiv(['description__selector-name'], 'Type Selector');
    const descriptionTitle = createDiv(['description__title'], 'Select elements by their type');
    const descriptionSyntax = createDiv(['description__syntax', 'highlight'], 'A');
    const descriptionHint = createDiv(['description__hint'], '');
    const descriptionExamples = createDiv(['lvl__examples'], 'Examples');
    const lvlExample = createDiv(['lvl__example'], '');

    const lvlCreator = new CreatorElement(lvlParam);

    const lvlWrapperCreator = new CreatorElement(lvlWrapper).getElement();
    const lvlTitleCreator = new CreatorElement(lvlTitle).getElement();
    const lvlCheckmarkCreator = new CreatorElement(lvlCheckmark).getElement();

    const lvlNavCreator = new CreatorElement(lvlNav).getElement();
    const lvlNavPrevCreator = new CreatorElement(lvlNavPrev).getElement();
    const lvlNavNextCreator = new CreatorElement(lvlNavNext).getElement();

    const lvlProgressBarCreator = new CreatorElement(lvlProgressBar).getElement();
    const lvlProgressCreator = new CreatorElement(lvlProgress).getElement();

    const lvlDescriptionCreator = new CreatorElement(lvlDescription).getElement();
    const descriptionSelectorCreator = new CreatorElement(descriptionSelector).getElement();
    const descriptionTitleCreator = new CreatorElement(descriptionTitle).getElement();
    const descriptionSyntaxCreator = new CreatorElement(descriptionSyntax).getElement();
    const descriptionHintCreator = new CreatorElement(descriptionHint).getElement();
    const descriptionExamplesCreator = new CreatorElement(descriptionExamples).getElement();
    const lvlExampleCreator = new CreatorElement(lvlExample).getElement();


    if (lvlTitleCreator && lvlCheckmarkCreator) lvlWrapperCreator?.prepend(lvlTitleCreator, lvlCheckmarkCreator);

    if (lvlNavPrevCreator && lvlNavNextCreator) lvlNavCreator?.prepend(lvlNavPrevCreator, lvlNavNextCreator);

    if (lvlProgressCreator) lvlProgressBarCreator?.prepend(lvlProgressCreator);

    if (
      descriptionSelectorCreator
      && descriptionTitleCreator
      && descriptionHintCreator
      && descriptionSyntaxCreator
      && descriptionExamplesCreator
      && lvlExampleCreator
      ) {
      lvlDescriptionCreator?.prepend(
        descriptionSelectorCreator,
        descriptionTitleCreator,
        descriptionHintCreator,
        descriptionSyntaxCreator,
        descriptionExamplesCreator,
        lvlExampleCreator
      );
    }

    if (
      lvlCreator
      && lvlWrapperCreator instanceof Node
      && lvlNavCreator instanceof Node
      && lvlProgressBarCreator instanceof Node
      && lvlDescriptionCreator instanceof Node
      ) {

      lvlCreator.getElement()?.prepend(
        lvlWrapperCreator,
        lvlNavCreator,
        lvlProgressBarCreator,
        lvlDescriptionCreator
      );
    }

    return lvlCreator;
  }
}