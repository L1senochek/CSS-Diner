import CreatorElement from "../../../creator/creator";
import { ElementFilled } from "../../../creator/fillDiv";

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
    const lvlProgressBar = creator.createDiv('div', ['lvl__progress-bar'], '');
    const lvlProgress = creator.createDiv('div', ['lvl__progress'], '');
    const lvlDescription = creator.createDiv('div', ['lvl__description', 'description'], '');
    const descriptionSelector = creator.createDiv('h3', ['description__selector-name'], 'Type Selector');
    const descriptionTitle = creator.createDiv('h3', ['description__title'], 'Select elements by their type');
    const descriptionSyntax = creator.createDiv('h2', ['description__syntax', 'highlight'], 'A');
    const descriptionHint = creator.createDiv('div', ['description__hint'], '');
    const descriptionExamples = creator.createDiv('h3', ['lvl__examples'], 'Examples');
    const lvlExample = creator.createDiv('div', ['lvl__example'], '');
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
  
    if (lvlNavPrevCreator && lvlNavNextCreator) lvlNavCreator?.prepend(lvlNavPrevCreator, lvlNavNextCreator);
    if (lvlTitleCreator && lvlCheckmarkCreator && lvlNavCreator) {
      lvlWrapperCreator?.prepend(lvlTitleCreator, lvlCheckmarkCreator, lvlNavCreator);
    }
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
      && lvlProgressBarCreator instanceof Node
      && lvlDescriptionCreator instanceof Node
      ) {
      lvlCreator.getElement()?.prepend(
        lvlWrapperCreator,
        lvlProgressBarCreator,
        lvlDescriptionCreator
      );
    }
    return lvlCreator;
  }
}
