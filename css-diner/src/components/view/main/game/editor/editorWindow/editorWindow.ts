import CreatorElement from "../../../../../creator/creator"
import lvlJSON from '../../../../../data/levels.json';
console.log(lvlJSON); // json  lvl file Array

const lvlNum = 0;

interface LevelData { 
  id: number,
  selectorName: string,
  title: string,
  syntax: string,
  levelDescription: string,
  examples: string[],
  quest: string,
  answer: string,
  markup: string[],
}

const editorCode = {
  tag: 'div',
  classNames: ['editor__code'],
  innerText: '',
  callback: null,
}

const markup = {
  tag: 'pre',
  classNames: ['markup'],
  innerText: '',
  callback: null,
}

const codeWrapper = {
  tag: 'code',
  classNames: ['code__wrapper'],
  innerText: '',
  callback: null,
}

export class MarkupView {
  markupView: CreatorElement;

  constructor() {
    this.markupView = this.createMarkup(lvlNum);
  }

  getHTMLElement() {
    return this.markupView.getElement();
  }

  createMarkup(lvlNum: number) {
    const editorCodeCreator = new CreatorElement(editorCode);
    const markupCreator = new CreatorElement(markup).getElement();
    const codeWrapperCreator = new CreatorElement(codeWrapper).getElement();
    const murkup = lvlJSON[lvlNum].markup;
    console.log(lvlJSON[lvlNum].markup)
    if (codeWrapperCreator) codeWrapperCreator.innerHTML = murkup;
    if (codeWrapperCreator) markupCreator?.appendChild(codeWrapperCreator);
    if (markupCreator) editorCodeCreator.getElement()?.appendChild(markupCreator);

    return editorCodeCreator;
  }
}