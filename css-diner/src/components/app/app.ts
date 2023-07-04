import { FooterView } from '../view/footer/footer';
import { HeaderView } from '../view/header/header';
import { ChopsticksView } from '../view/main/game/chopsticks/chopsticks';
import { EditorView } from '../view/main/game/editor/editor';
import { EditorCodeView } from '../view/main/game/editor/editorCode/editorCode';
import { MarkupView } from '../view/main/game/editor/editorWindow/editorWindow';
import { GameView } from '../view/main/game/game';
import { LanternView } from '../view/main/game/lanterns/lanterns';
import { GameQuestView } from '../view/main/game/quest/quest';
import { TableView } from '../view/main/game/table/table';
import { LvlAboutView } from '../view/main/lvl/lvl';
import { MainView } from '../view/main/main';
import lvlJSON from '../data/levels.json';
console.log(lvlJSON); // json  lvl file Array

export enum LvlStatus {
  status1 = 'completed',
  status2 = 'not completed',
  status3 = 'completed with hint',
  status4 = 'hint used',
}

let LevelsResult = Array(lvlJSON.length).fill(LvlStatus.status2);

export class App {
  lvl: number;
  currentDeg = 0;
  private headerView = new HeaderView({ tag: 'header', classNames: ['header'] });
  private footerView? = new FooterView();
  private mainView? = new MainView();
  private gameView? = new GameView();
  private lanternView = new LanternView({ tag: 'div', classNames: ['game__lanterns'] });
  gameQuestView = new GameQuestView({ tag: 'p2', classNames: ['game__quest'] });
  tableView = new TableView({ tag: 'div', classNames: ['game__table', 'table__wrapper'] });
  private chopsticksView = new ChopsticksView({ tag: 'div', classNames: ['game__chopsticks'] });
  editorView? = new EditorView();
  editorCodeView? = new EditorCodeView();
  markupView? = new MarkupView();
  lvlAboutView? = new LvlAboutView();

  // private readonly headerElement = this.headerView?.getHTMLElement();
  // private readonly reload = this.headerElement?.lastChild?.firstChild;
  // private readonly help = this.headerElement?.lastChild?.lastChild;

  private readonly mainElement = this.mainView?.getHTMLElement();
  private readonly mainWrapper = this.mainElement?.firstChild;
  private readonly gameViewElem = this.gameView?.getHTMLElement();
  // private readonly lanternViewElem = this.lanternView?.getHTMLElement();
  // private readonly gameQuestViewElem = this.gameQuestView?.getHTMLElement();
  // private readonly tableViewElem = this.tableView?.getHTMLElement();
  // private readonly tableContent = this.tableViewElem?.childNodes[1];
  // private readonly tableWrapper = this.tableViewElem?.childNodes[0];
  // private readonly table = this.tableViewElem?.lastChild?.firstChild;
  // private readonly chopsticksElem = this.chopsticksView?.getHTMLElement();
  private readonly editorViewElem = this.editorView?.getHTMLElement();
  private readonly editorCodeViewElem = this.editorCodeView?.getHTMLElement();
  private readonly editorInputCSS = this.editorCodeViewElem?.firstChild?.firstChild;
  private readonly editorEnterBtn = this.editorCodeViewElem?.firstChild?.lastChild;
  private readonly editorWindowCSS = this.editorViewElem?.childNodes[0].childNodes[1];
  private readonly editorWindowHtml = this.editorViewElem?.childNodes[1].childNodes[1];
  private readonly markupViewHTML = this.markupView?.getHTMLElement();
  private readonly markup = this.markupView?.getHTMLElement()?.firstChild?.firstChild;
  private readonly lvlAboutViewElem = this.lvlAboutView?.getHTMLElement();
  private readonly prevArr = this.lvlAboutViewElem?.firstChild?.childNodes[2]?.firstChild;
  private readonly nextArr = this.lvlAboutViewElem?.firstChild?.childNodes[2]?.lastChild;
  private readonly lvlProgress = this.lvlAboutViewElem?.children[1].firstChild;
  private readonly lvlTitle = this.lvlAboutViewElem?.firstChild?.childNodes[0]; // Level 1 of 32
  private readonly checkmark = this.lvlAboutViewElem?.firstChild?.childNodes[1]; // checkmark
  private readonly burger = this.lvlAboutViewElem?.firstChild?.lastChild; // burger
  private readonly curtainBurger = this.lvlAboutViewElem?.lastChild; // curtain-burger
  private readonly descriptionSelector = this.lvlAboutViewElem?.childNodes[2]?.firstChild; // description__selector-name // Type Selector
  private readonly descriptionSyntax = this.lvlAboutViewElem?.children[2].children[2]; // description__syntax highlight // A
  private readonly descriptionTitle = this.lvlAboutViewElem?.children[2].children[1]; // description__title // Select elements by their type
  private readonly lvlExample = this.lvlAboutViewElem?.children[2].children[4];
  private readonly hintWrapper = this.lvlAboutViewElem?.children[2].children[5];
  private readonly lvlhint = this.lvlAboutViewElem?.children[2].children[5].lastChild?.lastChild;
  private readonly footerElement = this.footerView?.getHTMLElement();

  constructor() {
    this.lvl = 0;
    this.getLocalStorageLvl();
    // this.createView();
  }

  createView() {
    console.log(this.tableView, 5555);
    if (this.footerElement) document.body.prepend(this.footerElement);
    if (this.lvlAboutViewElem && this.mainWrapper instanceof HTMLElement) {
      this.mainWrapper.append(this.lvlAboutViewElem);
    }
    if (this.editorCodeViewElem instanceof HTMLElement) this.editorWindowCSS?.appendChild(this.editorCodeViewElem);
    if (this.editorWindowHtml instanceof HTMLElement && this.markupViewHTML) {
      this.editorWindowHtml?.appendChild(this.markupViewHTML);
    }
    if (
      // this.lanternViewElem &&
      this.gameViewElem instanceof HTMLElement &&
      // this.gameQuestViewElem instanceof HTMLElement &&
      // this.tableViewElem instanceof HTMLElement &&
      // this.chopsticksElem instanceof HTMLElement &&
      this.editorViewElem instanceof HTMLElement
    ) {
      this.gameViewElem.prepend(
        this.lanternView.getHTMLElement(),
        this.gameQuestView.getHTMLElement(),
        this.tableView.getHTMLElement(),
        this.chopsticksView.getHTMLElement(),
        this.editorViewElem
      );
    }
    if (this.gameViewElem && this.mainWrapper instanceof HTMLElement) this.mainWrapper.prepend(this.gameViewElem);
    if (this.mainElement) document.body.prepend(this.mainElement);
    // if (this.headerElement) document.body.prepend(this.headerElement);
    document.body.prepend(this.headerView.getHTMLElement());
    this.renderLvl();
    this.setEvents();
  }

  createMarkup(num = this.lvl) {
    if (this.markup instanceof HTMLElement) this.markup.innerHTML = `${lvlJSON[num].markup}`;
  }

  changeQuestName(num = this.lvl) {
    // if (this.gameQuestViewElem instanceof HTMLElement) {
    this.gameQuestView.getHTMLElement().innerText = `${lvlJSON[num].quest}`;
    // }
  }

  changeTable(num = this.lvl) {
    if (this.tableView.tableContent instanceof HTMLElement) {
      this.tableView.tableContent.innerHTML = `${lvlJSON[num].markupOnTable}`;
    }
  }

  changeCheckmark() {
    if (this.checkmark instanceof HTMLElement) {
      if (LevelsResult[this.lvl] === LvlStatus.status1) {
        this.checkmark?.classList.add('completed');
        this.checkmark?.classList.remove('with-hint');
      } else if (LevelsResult[this.lvl] === LvlStatus.status2) {
        this.checkmark?.classList.remove('completed');
        this.checkmark?.classList.remove('with-hint');
      } else if (LevelsResult[this.lvl] === LvlStatus.status3) {
        this.checkmark?.classList.remove('completed');
        this.checkmark?.classList.add('with-hint');
      }
    }
  }

  changeAboutLvl(num = this.lvl) {
    if (
      this.lvlTitle instanceof HTMLElement &&
      this.descriptionSelector instanceof HTMLElement &&
      this.descriptionTitle instanceof HTMLElement &&
      this.descriptionSyntax instanceof HTMLElement &&
      this.lvlExample instanceof HTMLElement &&
      this.lvlhint instanceof HTMLElement
    ) {
      this.changeCheckmark();
      this.lvlTitle.innerText = `Level ${num + 1} of ${lvlJSON.length}`;
      this.descriptionSelector.innerText = `${lvlJSON[num].selectorName}`;
      this.descriptionTitle.innerText = `${lvlJSON[num].title}`;
      this.descriptionSyntax.innerText = `${lvlJSON[num].syntax}`;
      this.lvlExample.innerHTML = `${lvlJSON[num].examples}`;
      this.lvlhint.innerText = `${lvlJSON[num].hint}`;
    }
  }

  changeProgressBar(num = this.lvl) {
    if (this.lvlProgress instanceof HTMLElement) {
      this.lvlProgress.style.width = `${((num + 1) / lvlJSON.length) * 100}%`;
    }
  }

  changeHintClass(status: 'add' | 'remove') {
    if (this.hintWrapper instanceof HTMLElement) {
      if (status === 'add') {
        this.hintWrapper?.classList.add('active');
      } else if (status === 'remove') {
        this.hintWrapper?.classList.remove('active');
      }
    }
  }

  renderLvl(num?: number) {
    this.createMarkup(num);
    this.changeQuestName(num);
    this.changeTable(num);
    this.changeAboutLvl(num);
    this.changeProgressBar(num);
    this.changeWinClass('remove');
    this.clearInput();
    this.changeHintClass('remove');
    this.setMouse();
  }

  nextLvl() {
    if (this.lvl < lvlJSON.length - 1) {
      this.lvl += 1;
      this.renderLvl();
    }
  }

  prevLvl() {
    if (this.lvl > 0) {
      this.lvl -= 1;
      this.renderLvl();
    }
  }

  toLvl(num: number) {
    this.lvl = num;
    this.renderLvl(num);
  }

  changeWinClass(status: 'add' | 'remove') {
    // const table = this.tableViewElem?.childNodes[1].firstChild;
    // if (
    //   // this.gameQuestViewElem instanceof HTMLElement &&
    //   // this.tableWrapper instanceof HTMLElement &&
    //   // this.tableContent instanceof HTMLElement &&
    //   // table instanceof HTMLElement
    //   // this.chopsticksElem instanceof HTMLElement
    // ) {
    if (status === 'add') {
      this.gameQuestView.getHTMLElement().innerText = 'YOU WIN!';
      // this.tableWrapper?.classList.add('win');
      this.tableView.getHTMLElement().classList.add('win');
      // table?.classList.add('win');
      this.chopsticksView.getHTMLElement().classList.add('win');
    } else if (status === 'remove') {
      // this.tableWrapper?.classList.remove('win');
      this.tableView.getHTMLElement().classList.remove('win');
      // table.classList.remove('win');
      this.chopsticksView.getHTMLElement().classList.remove('win');
    }
    // }
  }

  clearInput() {
    if (this.editorInputCSS instanceof HTMLInputElement) this.editorInputCSS.value = '';
  }

  checkInputValue(value: string) {
    // const table = this.tableViewElem?.childNodes[1].firstChild;
    if (this.editorInputCSS instanceof HTMLInputElement) {
      if (value === lvlJSON[this.lvl].answer && this.lvl === lvlJSON.length - 1) {
        // if (
        //   this.tableWrapper instanceof HTMLElement &&
        //   this.tableContent instanceof HTMLElement &&
        //   table instanceof HTMLElement
        // ) {
        this.clearInput();
        this.changeWinClass('add');
        if (LevelsResult[this.lvl] === LvlStatus.status4) {
          LevelsResult[this.lvl] = LvlStatus.status3;
        } else {
          LevelsResult[this.lvl] = LvlStatus.status1;
        }
        // }
        this.changeCheckmark();
      } else if (value === lvlJSON[this.lvl].answer) {
        this.clearInput();
        if (LevelsResult[this.lvl] === LvlStatus.status4) {
          LevelsResult[this.lvl] = LvlStatus.status3;
        } else {
          LevelsResult[this.lvl] = LvlStatus.status1;
        }
        // if (table instanceof HTMLElement) {
        this.tableView.getHTMLElement().classList.add('roll-up_anim');
        setTimeout(() => {
          this.tableView.getHTMLElement().classList.remove('roll-up_anim');
          this.nextLvl();
        }, 1000);
        // }
      } else {
        this.editorViewElem?.classList.add('shake');
        setTimeout(() => {
          this.editorViewElem?.classList.remove('shake');
        }, 200);
      }
    }
  }

  hintWriter(index = 0) {
    if (index < lvlJSON[this.lvl].answer.length) {
      if (this.editorInputCSS instanceof HTMLInputElement) {
        this.editorInputCSS.value += lvlJSON[this.lvl].answer.charAt(index);
      }
      index += 1;
      setTimeout(() => this.hintWriter(index), 200);
    }
  }

  reloadGame() {
    this.lvl = 0;
    LevelsResult.forEach((element, index) => {
      LevelsResult[index] = LvlStatus.status2;
    });
    this.renderLvl();
  }

  reloadGameAnim(e: Event | null): void {
    if (e?.target === this.headerView.getPropertyElem(this.headerView.reloadCreator)) {
      this.currentDeg -= 180;
      if (this.headerView.getPropertyElem(this.headerView.reloadCreator) instanceof HTMLElement) {
        this.headerView.getPropertyElem(
          this.headerView.reloadCreator
        ).style.transform = `rotate(${this.currentDeg}deg)`;
      }
    }
  }

  createCurtainBurgerItem() {
    lvlJSON.forEach((lvl) => {
      const li = document.createElement('li');
      const lvlStatus = LevelsResult[lvl.id - 1];
      li.classList.add('curtain-burger__item');
      if (lvlStatus === LvlStatus.status1) {
        li.innerHTML = `<span class='lvl__checkmark completed'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      } else if (lvlStatus === LvlStatus.status3) {
        li.innerHTML = `<span class='lvl__checkmark with-hint'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      } else {
        li.innerHTML = `<span class='lvl__checkmark'></span><span class='lvl__id'>${lvl.id}</span><span class='lvl__syntax'>${lvl.syntax}</span>`;
      }
      if (this.lvl === lvl.id - 1) li.classList.add('active');
      if (this.curtainBurger instanceof HTMLElement) this.curtainBurger?.append(li);
    });
  }

  changeBurgerClass(status: 'toogle' | 'remove') {
    if (status === 'toogle') {
      if (this.burger instanceof HTMLElement) this.burger?.classList.toggle('active');
      if (this.curtainBurger instanceof HTMLElement) this.curtainBurger?.classList.toggle('active');
    } else if (status === 'remove') {
      if (this.burger instanceof HTMLElement) this.burger?.classList.remove('active');
      if (this.curtainBurger instanceof HTMLElement) this.curtainBurger?.classList.remove('active');
    }
    if (this.curtainBurger instanceof HTMLElement) this.curtainBurger.innerHTML = '';
  }

  changeLvlOnTarget(event: Event) {
    if (event.target instanceof Element) {
      if (event.target?.closest('.curtain-burger__item')) {
        const lvlTarget = Number(event.target?.closest('.curtain-burger__item')?.childNodes[1].textContent);
        this.lvl = lvlTarget - 1;
        this.toLvl(this.lvl);
      }
    }
  }

  highlightingElem(event: Event, status: 'add' | 'remove') {
    if (event.target instanceof HTMLElement && event.target.dataset.light) {
      const dataAtrubute = event.target.dataset.light;
      console.log(dataAtrubute);
      const lightElem = document.querySelectorAll(`[data-light="${dataAtrubute}"]`);
      if (status === 'add') {
        lightElem.forEach((element) => {
          element.classList.add('hovered');
        });
      } else if (status === 'remove') {
        lightElem.forEach((element) => {
          element.classList.remove('hovered');
        });
      }
    }
  }

  setLocalStorageLvl() {
    localStorage.setItem('lvl', `${this.lvl}`);
    localStorage.setItem('LevelsResult', `${JSON.stringify(LevelsResult)}`);
  }

  getLocalStorageLvl() {
    if (localStorage.getItem('lvl')) this.lvl = Number(localStorage.getItem('lvl'));
    if (localStorage.getItem('LevelsResult')) LevelsResult = JSON.parse(String(localStorage.getItem('LevelsResult')));
  }

  setMouse() {
    // const table = this.tableViewElem?.lastChild?.firstChild;
    this.tableView.tableContent?.addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, 'add');
    });

    this.tableView.tableContent?.addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, 'remove');
    });

    this.markup?.addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, 'add');
    });

    this.markup?.addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, 'remove');
    });
  }

  setEvents() {
    window.addEventListener('beforeunload', () => {
      this.setLocalStorageLvl();
    });

    this.prevArr?.addEventListener('click', () => {
      this.prevLvl();
    });

    this.nextArr?.addEventListener('click', () => {
      this.nextLvl();
    });

    this.editorEnterBtn?.addEventListener('click', () => {
      if (this.editorInputCSS instanceof HTMLInputElement) this.checkInputValue(this.editorInputCSS?.value);
    });

    this.editorInputCSS?.addEventListener('keydown', (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') {
        e.preventDefault();
        if (this.editorInputCSS instanceof HTMLInputElement) this.checkInputValue(this.editorInputCSS?.value);
      }
    });

    this.headerView.getPropertyElem(this.headerView.reloadCreator).addEventListener('click', (e: Event) => {
      this.reloadGame();
      this.reloadGameAnim(e);
    });

    this.headerView.getPropertyElem(this.headerView.helpCreator).addEventListener('click', () => {
      LevelsResult[this.lvl] = LvlStatus.status4;
      this.changeHintClass('add');
      this.clearInput();
      this.hintWriter();
    });

    this.burger?.addEventListener('click', () => {
      this.changeBurgerClass('toogle');
      this.createCurtainBurgerItem();
    });

    this.curtainBurger?.addEventListener('click', (event: Event) => {
      this.changeLvlOnTarget(event);
      this.changeBurgerClass('remove');
    });
  }
}
