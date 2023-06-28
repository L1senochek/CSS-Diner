import { FooterView } from "../view/footer/footer";
import { HeaderView } from "../view/header/header";
import { ChopsticksView } from "../view/main/game/chopsticks/chopsticks";
import { EditorView } from "../view/main/game/editor/editor";
import { EditorCodeView } from "../view/main/game/editor/editorCode/editorCode";
import { MarkupView } from "../view/main/game/editor/editorWindow/editorWindow";
import { GameView } from "../view/main/game/game";
import { LanternView } from "../view/main/game/lanterns/lanterns";
import { GameQuestView } from "../view/main/game/quest/quest";
import { TableView } from "../view/main/game/table/table";
import { MainView } from "../view/main/main";
import lvlJSON from '../data/levels.json';
import { LvlAboutView } from "../view/main/lvl/lvl";
console.log(lvlJSON); // json  lvl file Array

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

export enum LvlStatus {
  status1 = 'completed',
  status2 = 'not completed',
  status3 = 'completed with hint'
}

// export type LevelRes = {
//   lvl: LvlStatus
// }

const LevelsResult = [
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
];

export class App {
  lvl: number;
  private footerView? = new FooterView;
  private headerView? = new HeaderView;
  private mainView? = new MainView;
  private gameView? = new GameView;
  private lanternView? = new LanternView;
  gameQuestView? = new GameQuestView;
  tableView? = new TableView;
  private chopsticksView? = new ChopsticksView;
  editorView? = new EditorView;
  editorCodeView? = new EditorCodeView;
  markupView? = new MarkupView;
  lvlAboutView? = new LvlAboutView;
  //  /////
  private readonly footerElement = this.footerView?.getHTMLElement();
  private readonly mainElement = this.mainView?.getHTMLElement();
  private readonly mainWrapper = this.mainElement?.firstChild;
  private readonly gameViewElem = this.gameView?.getHTMLElement();
// сюда добавлять все что в game
  private readonly lanternViewElem = this.lanternView?.getHTMLElement();
  private readonly gameQuestViewElem = this.gameQuestView?.getHTMLElement();
  private readonly tableViewElem = this.tableView?.getHTMLElement();
  private readonly tableContent = this.tableViewElem?.childNodes[1];
  private readonly tableWrapper = this.tableViewElem?.childNodes[0];
  private readonly table = this.tableViewElem?.childNodes[1].firstChild;
  private readonly chopsticksElem = this.chopsticksView?.getHTMLElement();
  private readonly editorViewElem = this.editorView?.getHTMLElement();
  private readonly editorCodeViewElem = this.editorCodeView?.getHTMLElement();
  private readonly editorInputCSS = this.editorCodeViewElem?.firstChild?.firstChild;
  private readonly editorEnterBtn = this.editorCodeViewElem?.firstChild?.lastChild;
  private readonly editorWindowCSS = this.editorViewElem?.childNodes[0].childNodes[1];
  private readonly editorWindowHtml = this.editorViewElem?.childNodes[1].childNodes[1];
  private readonly markupViewHTML = this.markupView?.getHTMLElement()
  private readonly lvlAboutViewElem = this.lvlAboutView?.getHTMLElement();
  private readonly prevArr = this.lvlAboutViewElem?.firstChild?.lastChild?.firstChild;
  private readonly nextArr = this.lvlAboutViewElem?.firstChild?.lastChild?.lastChild;
  private readonly lvlProgress = this.lvlAboutViewElem?.children[1].firstChild;
  private readonly lvlTitle = this.lvlAboutViewElem?.firstChild?.firstChild; // Level 1 of 32
  private readonly checkmark = this.lvlAboutViewElem?.firstChild?.childNodes[1]; // checkmark
  private readonly descriptionSelector = this.lvlAboutViewElem?.lastChild?.firstChild; // description__selector-name // Type Selector
  private readonly descriptionTitle = this.lvlAboutViewElem?.children[2].children[1]; // description__title // Select elements by their type
  private readonly descriptionHint = this.lvlAboutViewElem?.children[2].children[2]; // description__hint 
  private readonly descriptionSyntax = this.lvlAboutViewElem?.children[2].children[3]; // description__syntax highlight // A
  private readonly lvlExample = this.lvlAboutViewElem?.children[2].children[5]; 
  private readonly headerElement = this.headerView?.getHTMLElement();
  private readonly markup = this.markupView?.getHTMLElement()?.firstChild?.firstChild;
  
  constructor() {
    this.lvl = 0;
    this.createView();
  }
  
  createView() {
    if (this.footerElement) document.body.prepend(this.footerElement);
    if (this.gameViewElem && this.mainWrapper instanceof HTMLElement) this.mainWrapper.prepend(this.gameViewElem);
    this.changeQuestName();
    this.changeTable();
    if (this.editorCodeViewElem instanceof HTMLElement) this.editorWindowCSS?.appendChild(this.editorCodeViewElem);
    if (this.editorWindowHtml instanceof HTMLElement && this.markupViewHTML) {
      this.editorWindowHtml?.appendChild(this.markupViewHTML)
    }
    this.createMarkup();
    if (this.lvlAboutViewElem && this.mainWrapper instanceof HTMLElement) this.mainWrapper.append(this.lvlAboutViewElem);
    // добавить все что в lvlinfo:
    this.changeAboutLvl();
    this.changeProgressBar();
    this.setEvents();
    if (
    this.lanternViewElem
    && this.gameViewElem instanceof HTMLElement
    && this.gameQuestViewElem instanceof HTMLElement
    && this.tableViewElem instanceof HTMLElement
    && this.chopsticksElem instanceof HTMLElement
    && this.editorViewElem instanceof HTMLElement
    ) {
      this.gameViewElem.prepend(
        this.lanternViewElem,
        this.gameQuestViewElem,
        this.tableViewElem,
        this.chopsticksElem,
        this.editorViewElem
      );
    }
    if (this.mainElement) document.body.prepend(this.mainElement);
    if (this.headerElement) document.body.prepend(this.headerElement);
  }

  createMarkup(num = this.lvl) {
    if (this.markup instanceof HTMLElement) this.markup.innerHTML = `${lvlJSON[num].markup}`;
  }

  changeQuestName(num = this.lvl) {
    if (this.gameQuestViewElem instanceof HTMLElement) {
      this.gameQuestViewElem.innerText = `${lvlJSON[num].quest}`;
    }
  }

  changeTable(num = this.lvl) {
    if (this.tableContent instanceof HTMLElement) {
      this.tableContent.innerHTML = `${lvlJSON[num].markupOnTable}`;
    }
  }

  changeAboutLvl(num = this.lvl) {
    console.log( this.checkmark, 'checkmark', LevelsResult[this.lvl], LvlStatus.status1)
  if (
    this.lvlTitle instanceof HTMLElement
    && this.checkmark instanceof HTMLElement
    && this.descriptionSelector instanceof HTMLElement
    && this.descriptionTitle instanceof HTMLElement
    && this.descriptionSyntax instanceof HTMLElement
    && this.lvlExample instanceof HTMLElement
    ) {
      this.lvlTitle.innerText = `Level ${num + 1} of ${lvlJSON.length}`;
      // добавить галочку(изменение) в зависимости от массива уровней
      // completed
      
      if (LevelsResult[this.lvl] === LvlStatus.status1) {
        this.checkmark?.classList.add('completed')
      } else if (LevelsResult[this.lvl] === LvlStatus.status2) {
        this.checkmark?.classList.remove('completed')
      } else {
        // status3 = 'completed with hint'
      }
      this.descriptionSelector.innerText = `${lvlJSON[num].selectorName}`;
      this.descriptionTitle.innerText = `${lvlJSON[num].title}`;
      this.descriptionSyntax.innerText = `${lvlJSON[num].syntax}`;
      this.lvlExample.innerHTML = `${lvlJSON[num].examples}`;
    }
  }

  changeProgressBar(num = this.lvl) {
    if (this.lvlProgress instanceof HTMLElement){
      this.lvlProgress.style.width = `${(num + 1)/lvlJSON.length * 100}%`;
    }
  }

  nextLvl() {
    if (this.lvl < (lvlJSON.length - 1)) {
      this.lvl += 1;
      this.createMarkup();
      this.changeQuestName();
      this.changeTable();
      this.changeAboutLvl();
      this.changeProgressBar();
      this.removeWinClass();
    }
  }

  prevLvl() {
    if (this.lvl > 0) {
      this.lvl -= 1;
      this.createMarkup();
      this.changeQuestName();
      this.changeTable();
      this.changeAboutLvl();
      this.changeProgressBar();
      this.removeWinClass();
    }
  }

  toLvl(num: number) {
    if (this.editorInputCSS instanceof HTMLInputElement) this.editorInputCSS.value = '';
    // переход на нужный лвл
    this.lvl = num;
    this.createMarkup(num);
    this.changeQuestName(num);
    this.changeTable(num);
    this.changeAboutLvl(num);
    this.changeProgressBar(num);
    this.removeWinClass();

  }

  removeWinClass(){
    if (
      this.tableWrapper instanceof HTMLElement
      && this.tableContent instanceof HTMLElement
      && this.table instanceof HTMLElement
      && this.chopsticksElem instanceof HTMLElement
      ) {
        this.tableWrapper?.classList.remove('win');
        this.tableContent.classList.remove('win');
        this.table.classList.remove('win');
        this.chopsticksElem.classList.remove('win');
      }
  }

  checkInputValue(value: string) {
    const table = this.tableViewElem?.childNodes[1].firstChild;
    if (this.editorInputCSS instanceof HTMLInputElement) {
      if (value === lvlJSON[this.lvl].answer && this.lvl === (lvlJSON.length - 1)) {  
        if (
          this.gameQuestViewElem instanceof HTMLElement
          && this.tableWrapper instanceof HTMLElement
          && this.tableContent instanceof HTMLElement
          && table instanceof HTMLElement
          && this.chopsticksElem instanceof HTMLElement
          ) {
          this.gameQuestViewElem.innerText = 'YOU WIN!';
          this.tableWrapper?.classList.add('win');
          this.tableContent.classList.add('win');
          table?.classList.add('win');
          this.chopsticksElem.classList.add('win');
          LevelsResult[this.lvl] = LvlStatus.status1;
        }
      } else if (value === lvlJSON[this.lvl].answer) {
        this.editorInputCSS.value = '';
        
        LevelsResult[this.lvl] = LvlStatus.status1;
        this.nextLvl();
        // сохранить в массив уровней пройден ли лвл
        // изменить статус уровня, если он пройден
      } else {
        this.editorViewElem?.classList.add('shake');
        setTimeout(() => {
          this.editorViewElem?.classList.remove('shake');
        }, 200);
      }
    }
  }

  setEvents() {
    this.prevArr?.addEventListener('click', () => {
      this.prevLvl();
    });
    this.nextArr?.addEventListener('click', () => {
      this.nextLvl();
    });

    this.editorEnterBtn?.addEventListener('click', () => {
      if (this.editorInputCSS instanceof HTMLInputElement) {
        this.checkInputValue(this.editorInputCSS?.value)
      }
    });

    this.editorInputCSS?.addEventListener('keydown', (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') {
        e.preventDefault();
        if (this.editorInputCSS instanceof HTMLInputElement) this.checkInputValue(this.editorInputCSS?.value)
      }
    });
  }
}
