import { View } from '../../../creator/view';
import { ChopsticksView } from './chopsticks/chopsticks';
import { EditorView } from './editor/editor';
import { EditorCodeView } from './editor/editorCode/editorCode';
import { MarkupView } from './editor/editorWindow/editorWindow';
import './game.css';
import { LanternView } from './lanterns/lanterns';
import { GameQuestView } from './quest/quest';
import { TableView } from './table/table';
import lvlJSON from '../../../data/levels.json';
import { StatusAddRemove } from '../../../../types/app/app';
import { ElementParam } from '../../../../types/creator/creator';

export class GameView extends View {
  lanternView = new LanternView({ classNames: ['game__lanterns'] });
  gameQuestView = new GameQuestView({ tag: 'p2', classNames: ['game__quest'] });
  tableView = new TableView({ classNames: ['game__table', 'table__wrapper'] });
  chopsticksView = new ChopsticksView({ classNames: ['game__chopsticks'] });
  editorView = new EditorView({ classNames: ['game__editor', 'editor'], innerText: '' });
  editorCodeView = new EditorCodeView({ classNames: ['editor__code'] });
  markupView = new MarkupView({ classNames: ['editor__code'] });

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.editorView.windowCreatorCSS.appendChild(this.editorCodeView.getHTMLElement());
    this.editorView.windowCreatorHTML.appendChild(this.markupView.getHTMLElement());
    this.view
      .getElement()
      .prepend(
        this.lanternView.getHTMLElement(),
        this.gameQuestView.getHTMLElement(),
        this.tableView.getHTMLElement(),
        this.chopsticksView.getHTMLElement(),
        this.editorView.getHTMLElement()
      );
  }

  createMarkup(lvl: number): void {
    this.markupView.codeWrapper.innerHTML = `${lvlJSON[lvl].markup}`;
  }

  changeQuestName(lvl: number): void {
    this.gameQuestView.getHTMLElement().innerText = `${lvlJSON[lvl].quest}`;
  }

  changeTable(lvl: number): void {
    this.tableView.tableContent.innerHTML = `${lvlJSON[lvl].markupOnTable}`;
  }

  changeWinClass(status: StatusAddRemove.ADD | StatusAddRemove.REMOVE): void {
    if (status === StatusAddRemove.ADD) {
      this.gameQuestView.getHTMLElement().innerText = 'YOU WIN!';
      this.tableView.getHTMLElement().classList.add('win');
      this.chopsticksView.getHTMLElement().classList.add('win');
    } else if (status === StatusAddRemove.REMOVE) {
      this.tableView.getHTMLElement().classList.remove('win');
      this.chopsticksView.getHTMLElement().classList.remove('win');
    }
  }

  clearInput(): void {
    if (this.editorCodeView.inputField instanceof HTMLInputElement) {
      this.editorCodeView.inputField.value = '';
    }
  }
}
