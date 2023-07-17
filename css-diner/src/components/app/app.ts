import { HeaderView } from '../view/header/header';
import { GameView } from '../view/main/game/game';
import { LvlAboutView } from '../view/main/lvl/lvl';
import { MainView } from '../view/main/main';
import lvlJSON from '../data/levels.json';
import { LvlStatus, StatusAddRemove, LvlRangeStatus, KeyLocalStorage, StatusToogleRemove } from '../../types/app/app';

export class App {
  lvl: number;
  private currentDeg = 0;
  private headerView = new HeaderView({ tag: 'header', classNames: ['header'] });
  private mainView = new MainView({ tag: 'main', classNames: ['main'] });
  private gameView = new GameView({ classNames: ['game'] });
  lvlAboutView = new LvlAboutView({ classNames: ['lvl__about'], innerText: '' });
  LevelsResult = Array(lvlJSON.length).fill(LvlStatus.STATUS_NOT_COMPLETED);

  constructor() {
    this.lvl = 0;
    this.getLocalStorageLvl();
  }

  createView(): void {
    this.mainView.mainWrapper.append(this.lvlAboutView.getHTMLElement());
    this.mainView.mainWrapper.prepend(this.gameView.getHTMLElement());
    document.body.prepend(this.mainView.getHTMLElement());
    document.body.prepend(this.headerView.getHTMLElement());
    this.renderLvl(this.lvl);
    this.setEvents();
  }

  private changeHintClass(status: StatusAddRemove.ADD | StatusAddRemove.REMOVE): void {
    if (status === StatusAddRemove.ADD) {
      this.lvlAboutView.hintWrapper.classList.add('active');
    } else if (status === StatusAddRemove.REMOVE) {
      this.lvlAboutView.hintWrapper.classList.remove('active');
    }
  }

  renderLvl(lvl: number): void {
    this.gameView.createMarkup(lvl);
    this.gameView.changeQuestName(lvl);
    this.gameView.changeTable(lvl);
    this.lvlAboutView.changeAboutLvl(this.LevelsResult, lvl);
    this.lvlAboutView.changeProgressBar(lvl);
    this.gameView.changeWinClass(StatusAddRemove.REMOVE);
    this.gameView.clearInput();
    this.changeHintClass(StatusAddRemove.REMOVE);
    this.setMouse();
  }

  private checkInputValue(value: string): void {
    if (value === lvlJSON[this.lvl].answer && this.lvl === lvlJSON.length - 1) {
      this.gameView.clearInput();
      this.gameView.changeWinClass(StatusAddRemove.ADD);
      if (this.LevelsResult[this.lvl] === LvlStatus.STATUS_HINT_USED) {
        this.LevelsResult[this.lvl] = LvlStatus.STATUS_COMPLETED_WITH_HINT;
      } else {
        this.LevelsResult[this.lvl] = LvlStatus.STATUS_COMPLETED;
      }
      this.lvlAboutView.changeCheckmark(this.LevelsResult, this.lvl);
    } else if (value === lvlJSON[this.lvl].answer) {
      this.gameView.clearInput();
      if (this.LevelsResult[this.lvl] === LvlStatus.STATUS_HINT_USED) {
        this.LevelsResult[this.lvl] = LvlStatus.STATUS_COMPLETED_WITH_HINT;
      } else {
        this.LevelsResult[this.lvl] = LvlStatus.STATUS_COMPLETED;
      }
      this.gameView.tableView.getHTMLElement().classList.add('roll-up_anim');
      setTimeout(() => {
        this.checkLvlRange(LvlRangeStatus.INCREASE);
        this.gameView.tableView.getHTMLElement().classList.remove('roll-up_anim');
      }, 1000);
    } else {
      this.gameView.editorView.getHTMLElement().classList.add('shake');
      setTimeout(() => {
        this.gameView.editorView.getHTMLElement().classList.remove('shake');
      }, 200);
    }
  }

  private hintWriter(index = 0): void {
    if (index < lvlJSON[this.lvl].answer.length) {
      if (this.gameView.editorCodeView.inputField instanceof HTMLInputElement) {
        this.gameView.editorCodeView.inputField.value += lvlJSON[this.lvl].answer.charAt(index);
      }
      index += 1;
      setTimeout(() => this.hintWriter(index), 200);
    }
  }

  private reloadGame(): void {
    this.lvl = 0;
    this.LevelsResult.forEach((element, index) => {
      this.LevelsResult[index] = LvlStatus.STATUS_NOT_COMPLETED;
    });
    this.renderLvl(this.lvl);
  }

  private reloadGameAnim(e: Event | null): void {
    if (e?.target === this.headerView.reloadCreator) {
      this.currentDeg -= 180;
      this.headerView.reloadCreator.style.transform = `rotate(${this.currentDeg}deg)`;
    }
  }

  checkLvlRange(status: LvlRangeStatus.INCREASE | LvlRangeStatus.DECREASE) {
    if (status === LvlRangeStatus.INCREASE) {
      if (this.lvl < lvlJSON.length - 1) {
        this.lvl += 1;
        this.lvlAboutView.nextLvl(this.lvl, this.renderLvl.bind(this));
      }
    } else {
      if (this.lvl > 0) {
        this.lvl -= 1;
        this.lvlAboutView.prevLvl(this.lvl, this.renderLvl.bind(this));
      }
    }
  }

  private highlightingElem(event: Event, status: StatusAddRemove.ADD | StatusAddRemove.REMOVE): void {
    if (event.target instanceof HTMLElement && event.target.dataset.light) {
      const dataAtrubute = event.target.dataset.light;
      const lightElem = document.querySelectorAll(`[data-light="${dataAtrubute}"]`);
      if (status === StatusAddRemove.ADD) {
        lightElem.forEach((element) => {
          element.classList.add('hovered');
        });
      } else if (status === StatusAddRemove.REMOVE) {
        lightElem.forEach((element) => {
          element.classList.remove('hovered');
        });
      }
    }
  }

  private setLocalStorageLvl(): void {
    localStorage.setItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LVL, `${this.lvl}`);
    localStorage.setItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LEVELS_RESULT, `${JSON.stringify(this.LevelsResult)}`);
  }

  private getLocalStorageLvl(): void {
    if (localStorage.getItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LVL)) {
      this.lvl = Number(localStorage.getItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LVL));
    }
    if (localStorage.getItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LEVELS_RESULT)) {
      this.LevelsResult = JSON.parse(String(localStorage.getItem(KeyLocalStorage.LOCAL_STORAGE_KEY_LEVELS_RESULT)));
    }
  }

  private setMouse(): void {
    this.gameView.tableView.tableContent.addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, StatusAddRemove.ADD);
    });

    this.gameView.tableView.tableContent.addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, StatusAddRemove.REMOVE);
    });

    this.gameView.markupView.codeWrapper.addEventListener('mouseover', (e: Event) => {
      this.highlightingElem(e, StatusAddRemove.ADD);
    });

    this.gameView.markupView.codeWrapper.addEventListener('mouseout', (e: Event) => {
      this.highlightingElem(e, StatusAddRemove.REMOVE);
    });
  }

  private setEvents(): void {
    window.addEventListener('beforeunload', () => {
      this.setLocalStorageLvl();
    });

    this.lvlAboutView.lvlTitle.lvlNavPrev.addEventListener('click', () => {
      this.checkLvlRange(LvlRangeStatus.DECREASE);
    });

    this.lvlAboutView.lvlTitle.lvlNavNext.addEventListener('click', () => {
      this.checkLvlRange(LvlRangeStatus.INCREASE);
    });

    this.gameView.editorCodeView.enterBtn.addEventListener('click', () => {
      if (this.gameView.editorCodeView.inputField instanceof HTMLInputElement) {
        this.checkInputValue(this.gameView.editorCodeView.inputField.value);
      }
    });

    this.gameView.editorCodeView.inputField.addEventListener('keydown', (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') {
        e.preventDefault();
        if (this.gameView.editorCodeView.inputField instanceof HTMLInputElement) {
          this.checkInputValue(this.gameView.editorCodeView.inputField.value);
        }
      }
    });

    this.headerView.reloadCreator.addEventListener('click', (e: Event) => {
      this.reloadGame();
      this.reloadGameAnim(e);
    });

    this.headerView.helpCreator.addEventListener('click', () => {
      this.LevelsResult[this.lvl] = LvlStatus.STATUS_HINT_USED;
      this.changeHintClass(StatusAddRemove.ADD);
      this.gameView.clearInput();
      this.hintWriter();
    });

    this.lvlAboutView.lvlTitle.burger.addEventListener('click', () => {
      this.lvlAboutView.changeBurgerClass(StatusToogleRemove.TOOGLE);
      this.lvlAboutView.createCurtainBurgerItem(this.LevelsResult, this.lvl);
    });

    this.lvlAboutView.curtainBurger.addEventListener('click', (event: Event) => {
      if (event.target instanceof Element) {
        if (event.target?.closest('.curtain-burger__item')) {
          const lvlTarget = Number(event.target?.closest('.curtain-burger__item')?.childNodes[1].textContent);
          this.lvl = lvlTarget - 1;
        }
      }
      this.lvlAboutView.changeLvlOnTarget(this.lvl, this.renderLvl.bind(this));
      this.lvlAboutView.changeBurgerClass(StatusToogleRemove.REMOVE);
    });
  }
}
