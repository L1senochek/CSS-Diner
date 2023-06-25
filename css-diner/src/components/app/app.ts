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

export enum LvlStatus {
  status1 = 'completed',
  status2 = 'not completed',
  status3 = 'completed with hint'
}

// export type LevelRes = {
//   lvl: LvlStatus
// }

const LevelsResult = [
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
  LvlStatus.status2, LvlStatus.status2, LvlStatus.status2, LvlStatus.status2,
  LvlStatus.status2, LvlStatus.status2
];

export class App {
  lvl: number;

  private footerView?: FooterView;
  private headerView?: HeaderView;
  private mainView?: MainView;

  private gameView?: GameView;
  private lanternView?: LanternView;
  gameQuestView?: GameQuestView;
  tableView?: TableView;
  private chopsticksView?: ChopsticksView;
  editorView?: EditorView;
  editorCodeView?: EditorCodeView;
  markupView?: MarkupView;

  lvlAboutView?: LvlAboutView;
  constructor() {
    this.lvl = 0;
    this.createView();
  }

  createView() {
    this.footerView = new FooterView();
    const footerElement = this.footerView.getHTMLElement();
    if (footerElement) document.body.prepend(footerElement);
   
    this.mainView = new MainView();
    const mainElement = this.mainView.getHTMLElement();
    const mainWrapper = mainElement?.firstChild;

    this.gameView = new GameView();
    const gameViewElem = this.gameView.getHTMLElement();

    if (gameViewElem && mainWrapper instanceof HTMLElement) mainWrapper.prepend(gameViewElem);
    // сюда добавлять все что в game
    console.log(mainWrapper);
    this.lanternView = new LanternView();
    const lanternViewElem = this.lanternView.getHTMLElement();

    // изменяемый параметр:
    this.gameQuestView = new GameQuestView();
    const gameQuestViewElem = this.gameQuestView.getHTMLElement();
    this.changeQuestName();

    this.tableView = new TableView();
    const tableViewElem = this.tableView.getHTMLElement();
    this.changeTable();
    // изменяемый параметр:
    // const tableContent = tableViewElem?.childNodes[1];

    this.chopsticksView = new ChopsticksView();
    const chopsticksElem = this.chopsticksView.getHTMLElement();
    
    this.editorView = new EditorView();
    const editorViewElem = this.editorView.getHTMLElement();

    
    this.editorCodeView = new EditorCodeView();
    const editorCodeViewElem = this.editorCodeView.getHTMLElement();

    this.markupView = new MarkupView();

    const editorWindowCSS = editorViewElem?.childNodes[0].childNodes[1];
    const editorWindowHtml = editorViewElem?.childNodes[1].childNodes[1];

    if (editorCodeViewElem instanceof HTMLElement) editorWindowCSS?.appendChild(editorCodeViewElem)
    
    const markupViewHTML = this.markupView.getHTMLElement()

    if (editorWindowHtml instanceof HTMLElement && markupViewHTML) {
      editorWindowHtml?.appendChild(markupViewHTML)
    }

    this.createMarkup();
    
    // изменяемый параметр ( input ):
    // const editorCodeViewElem = this.editorCodeView.getHTMLElement();
    // const editorInputCSS = editorCodeViewElem?.firstChild?.firstChild;

    
    this.lvlAboutView = new LvlAboutView();
    const lvlAboutViewElem = this.lvlAboutView.getHTMLElement();

    if (lvlAboutViewElem && mainWrapper instanceof HTMLElement) mainWrapper.append(lvlAboutViewElem);
   
    // добавить все что в lvlinfo:

    // const lvlAboutViewElem = this.lvlAboutView.getHTMLElement();
    // const lvlTitle = lvlAboutViewElem?.firstChild?.firstChild; // Level 1 of 32

    // const lvlAboutViewElem = this.lvlAboutView.getHTMLElement();
    // const arrowPrev = lvlAboutViewElem?.children[1].firstChild
    // const arrowNext = lvlAboutViewElem?.children[1].lastChild

    // const lvlAboutViewElem = this.lvlAboutView.getHTMLElement();
    // const lvlProgress = lvlAboutViewElem?.children[2].firstChild // lvl__progress
    
    // const lvlAboutViewElem = this.lvlAboutView.getHTMLElement();
    const descriptionSelector = lvlAboutViewElem?.lastChild?.firstChild // description__selector-name // Type Selector
    // const descriptionTitle = lvlAboutViewElem?.children[3].children[1] // description__title // Select elements by their type
    // const descriptionHint = lvlAboutViewElem?.children[3].children[2] // description__hint 
    // const descriptionSyntax = lvlAboutViewElem?.children[3].children[3] // description__syntax highlight // A
    // const lvlExample = lvlAboutViewElem?.children[3].children[5] // lvl__example //


    console.log(lvlAboutViewElem, lvlAboutViewElem?.children[3].children[2]) // Level 1 of 32
    //

    if (
      lanternViewElem
      && gameViewElem instanceof HTMLElement
      && gameQuestViewElem instanceof HTMLElement
      && tableViewElem instanceof HTMLElement
      && chopsticksElem instanceof HTMLElement
      && editorViewElem instanceof HTMLElement
      ) {
        gameViewElem.prepend(
        lanternViewElem,
        gameQuestViewElem,
        tableViewElem,
        chopsticksElem,
        editorViewElem
      );
    }
    if (mainElement) document.body.prepend(mainElement);
    
    this.headerView = new HeaderView();
    const headerElement = this.headerView.getHTMLElement();
    if (headerElement) document.body.prepend(headerElement);
  }

  createMarkup(num = this.lvl) {
    console.log(num, 'this.markupView?.getHTMLElement()');


    if (this.markupView) {
      // изменяемый параметр ( markup ):
      const markup = this.markupView.getHTMLElement()?.firstChild?.firstChild;
      if (markup instanceof HTMLElement) markup.innerHTML = `${lvlJSON[num].markup}`;
    }
  }

  changeQuestName(num = this.lvl) {
    // изменяемый параметр ( gameQuest ):
    if (this.gameQuestView) {
      const gameQuestViewElem = this.gameQuestView.getHTMLElement();
      if (gameQuestViewElem instanceof HTMLElement) {
        gameQuestViewElem.innerText = `${lvlJSON[num].quest}`;
      }
    }
  }

  changeTable(num = this.lvl) {
    if (this.tableView) {

    const tableViewElem = this.tableView.getHTMLElement();

    // изменяемый параметр создается поле игры:
    const tableWrapper = tableViewElem?.childNodes[0];
    if (tableWrapper instanceof HTMLElement){
      tableWrapper?.classList.add(`lvl${num}`);
    }
    const tableContent = tableViewElem?.childNodes[1];

    if (tableContent instanceof HTMLElement) {
      tableContent.innerHTML = `${lvlJSON[num].markupOnTable}`;
    }
    }
  }

  nextLvl() {
    if (this.lvl < 19) {
      this.lvl += 1;
      console.log(this.lvl);
      this.createMarkup();
      this.changeQuestName();
      this.changeTable();
    }
  }

  prevLvl() {
    if (this.lvl > 0) {
      this.lvl -= 1;
      console.log(this.lvl);
      this.createMarkup();
      this.changeQuestName();
      this.changeTable();
    }
  }

  toLvl(num: number) {
    // переход на нужный лвл
    this.lvl = num;
    this.createMarkup(num);
    this.changeQuestName(num);
    this.changeTable(num);
  }

  checkInputValue(value: string) {
    const editorCodeViewElem = this.editorCodeView?.getHTMLElement();
    const editorInputCSS = editorCodeViewElem?.firstChild?.firstChild;

    if (editorInputCSS instanceof HTMLInputElement) {
      
      if (value === lvlJSON[this.lvl].answer) {
        console.log(editorInputCSS.value, 'input11')
        this.nextLvl();
        // сохранить в массив уровней пройден ли лвл
        LevelsResult[this.lvl] = LvlStatus.status1;
      } else {
        console.log(2)
        // добавить метод/класс с анимацией не правильного ввода
      }
      
    }
  }

}