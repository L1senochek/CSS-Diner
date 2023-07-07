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
  private mainView = new MainView({ tag: 'main', classNames: ['main']});
  private gameView = new GameView({ tag: 'div', classNames: ['game']});
  private lanternView = new LanternView({ tag: 'div', classNames: ['game__lanterns'] });
  gameQuestView = new GameQuestView({ tag: 'p2', classNames: ['game__quest'] });
  tableView = new TableView({ tag: 'div', classNames: ['game__table', 'table__wrapper'] });
  private chopsticksView = new ChopsticksView({ tag: 'div', classNames: ['game__chopsticks'] });
  editorView = new EditorView({ tag: 'div', classNames: ['game__editor', 'editor'], innerText: '' });
  editorCodeView = new EditorCodeView({ tag: 'div', classNames: ['editor__code']});
  markupView = new MarkupView({ tag: 'div', classNames: ['editor__code']});
  lvlAboutView = new LvlAboutView({ tag: 'div', classNames: ['lvl__about'], innerText: '' });
  
  constructor() {
    this.lvl = 0;
    this.getLocalStorageLvl();
  }

  createView() {
    this.mainView.getPropertyElem(this.mainView.mainWrapper).append(this.lvlAboutView.getHTMLElement());
    this.editorView.getPropertyElem(this.editorView.windowCreatorCSS).appendChild(this.editorCodeView.getHTMLElement());
    this.editorView.getPropertyElem(this.editorView.windowCreatorHTML).appendChild(this.markupView.getHTMLElement());
    this.gameView.getHTMLElement().prepend(
      this.lanternView.getHTMLElement(),
      this.gameQuestView.getHTMLElement(),
      this.tableView.getHTMLElement(),
      this.chopsticksView.getHTMLElement(),
      this.editorView.getHTMLElement()
    );
    this.mainView.getPropertyElem(this.mainView.mainWrapper).prepend(this.gameView.getHTMLElement());
    document.body.prepend(this.mainView.getHTMLElement());
    document.body.prepend(this.headerView.getHTMLElement());
    this.renderLvl();
    this.setEvents();
  }

  createMarkup(num = this.lvl) {
    this.markupView.getPropertyElem(this.markupView.codeWrapper).innerHTML = `${lvlJSON[num].markup}`;
  }

  changeQuestName(num = this.lvl) {
    this.gameQuestView.getHTMLElement().innerText = `${lvlJSON[num].quest}`;
  }

  changeTable(num = this.lvl) {
    this.tableView.getPropertyElem(this.tableView.tableContent).innerHTML = `${lvlJSON[num].markupOnTable}`;
  }

  changeCheckmark() {
    if (this.lvlAboutView.lvlTitle?.lvlCheckmark instanceof HTMLElement) {
      if (LevelsResult[this.lvl] === LvlStatus.status1) {
        this.lvlAboutView.getPropertyElem(this.lvlAboutView.lvlTitle.lvlCheckmark).classList.add('completed');
        this.lvlAboutView.lvlTitle.lvlCheckmark.classList.remove('with-hint');
      } else if (LevelsResult[this.lvl] === LvlStatus.status2) {
        this.lvlAboutView.lvlTitle.lvlCheckmark.classList.remove('completed');
        this.lvlAboutView.lvlTitle.lvlCheckmark.classList.remove('with-hint');
      } else if (LevelsResult[this.lvl] === LvlStatus.status3) {
        this.lvlAboutView.lvlTitle.lvlCheckmark.classList.remove('completed');
        this.lvlAboutView.lvlTitle.lvlCheckmark.classList.add('with-hint');
      }
    }
  }

  changeAboutLvl(num = this.lvl) {
    if (
      this.lvlAboutView.lvlTitle?.lvlTitle &&
      this.lvlAboutView.description?.descriptionSelector &&
      this.lvlAboutView.description.descriptionTitle &&
      this.lvlAboutView.description.descriptionSyntax &&
      this.lvlAboutView.description.lvlExample &&
      this.lvlAboutView.description.hintContent
    ) {
      this.changeCheckmark();
      this.lvlAboutView.lvlTitle.lvlTitle.innerText = `Level ${num + 1} of ${lvlJSON.length}`;
      this.lvlAboutView.description.descriptionSelector.innerText = `${lvlJSON[num].selectorName}`;
      this.lvlAboutView.description.descriptionTitle.innerText = `${lvlJSON[num].title}`;
      this.lvlAboutView.description.descriptionSyntax.innerText = `${lvlJSON[num].syntax}`;
      this.lvlAboutView.description.lvlExample.innerHTML = `${lvlJSON[num].examples}`;
      this.lvlAboutView.description.hintContent.innerText = `${lvlJSON[num].hint}`;
    }
  }

  changeProgressBar(num = this.lvl) {
    if (this.lvlAboutView.lvlProgress instanceof HTMLElement) {
      this.lvlAboutView.lvlProgress.style.width = `${((num + 1) / lvlJSON.length) * 100}%`;
    }
  }

  changeHintClass(status: 'add' | 'remove') {
    if (status === 'add') {
      this.lvlAboutView.hintWrapper?.classList.add('active');
    } else if (status === 'remove') {
      this.lvlAboutView.hintWrapper?.classList.remove('active');
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
    if (status === 'add') {
      this.gameQuestView.getHTMLElement().innerText = 'YOU WIN!';
      this.tableView.getHTMLElement().classList.add('win');
      this.chopsticksView.getHTMLElement().classList.add('win');
    } else if (status === 'remove') {
      this.tableView.getHTMLElement().classList.remove('win');
      this.chopsticksView.getHTMLElement().classList.remove('win');
    }
  }

  clearInput() {
    if (this.editorCodeView.inputField instanceof HTMLInputElement) {
      console.log(711)
      this.editorCodeView.inputField.value = '';
    }
  }

  checkInputValue(value: string) {
    if (value === lvlJSON[this.lvl].answer && this.lvl === lvlJSON.length - 1) {
      this.clearInput();
      this.changeWinClass('add');
      if (LevelsResult[this.lvl] === LvlStatus.status4) {
        LevelsResult[this.lvl] = LvlStatus.status3;
      } else {
        LevelsResult[this.lvl] = LvlStatus.status1;
      }
      this.changeCheckmark();
    } else if (value === lvlJSON[this.lvl].answer) {
      this.clearInput();
      if (LevelsResult[this.lvl] === LvlStatus.status4) {
        LevelsResult[this.lvl] = LvlStatus.status3;
      } else {
        LevelsResult[this.lvl] = LvlStatus.status1;
      }
      this.tableView.getHTMLElement().classList.add('roll-up_anim');
      setTimeout(() => {
        this.tableView.getHTMLElement().classList.remove('roll-up_anim');
        this.nextLvl();
      }, 1000);
    } else {
      this.editorView.getHTMLElement().classList.add('shake');
      setTimeout(() => {
        this.editorView.getHTMLElement().classList.remove('shake');
      }, 200);
    }
  }

  hintWriter(index = 0) {
    if (index < lvlJSON[this.lvl].answer.length) {
      if (this.editorCodeView.inputField instanceof HTMLInputElement) {
        console.log(this.editorCodeView.inputField.value, 945, lvlJSON[this.lvl].answer.charAt(index))
        this.editorCodeView.inputField.value += lvlJSON[this.lvl].answer.charAt(index);
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
      this.lvlAboutView.curtainBurger?.append(li);
    });
  }

  changeBurgerClass(status: 'toogle' | 'remove') {
    if (status === 'toogle') {
      this.lvlAboutView.lvlTitle?.burger?.classList.toggle('active');
      this.lvlAboutView.curtainBurger?.classList.toggle('active');
    } else if (status === 'remove') {
      this.lvlAboutView.lvlTitle?.burger?.classList.remove('active');
      this.lvlAboutView.curtainBurger?.classList.remove('active');
    }
    if (this.lvlAboutView.curtainBurger instanceof HTMLElement) this.lvlAboutView.curtainBurger.innerHTML = '';
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
    this.tableView.tableContent?.addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, 'add');
    });

    this.tableView.tableContent?.addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, 'remove');
    });

    this.markupView.getPropertyElem(this.markupView.codeWrapper).addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, 'add');
    });

    this.markupView.getPropertyElem(this.markupView.codeWrapper).addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, 'remove');
    });
  }

  setEvents() {
    window.addEventListener('beforeunload', () => {
      this.setLocalStorageLvl();
    });

    this.lvlAboutView.lvlTitle?.lvlNavPrev?.addEventListener('click', () => {
      this.prevLvl();
    });

    this.lvlAboutView.lvlTitle?.lvlNavNext?.addEventListener('click', () => {
      this.nextLvl();
    });

    this.editorCodeView.enterBtn?.addEventListener('click', () => {
      if (this.editorCodeView.inputField instanceof HTMLInputElement) {
      this.checkInputValue(this.editorCodeView.inputField.value);
      }
    });

    this.editorCodeView.getPropertyElem(this.editorCodeView.inputField).addEventListener('keydown', (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') {
        e.preventDefault();
        if (this.editorCodeView.inputField instanceof HTMLInputElement) this.checkInputValue(this.editorCodeView.inputField.value);
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

    this.lvlAboutView.lvlTitle?.burger?.addEventListener('click', () => {
      this.changeBurgerClass('toogle');
      this.createCurtainBurgerItem();
    });

    this.lvlAboutView.curtainBurger?.addEventListener('click', (event: Event) => {
      this.changeLvlOnTarget(event);
      this.changeBurgerClass('remove');
    });
  }
}
