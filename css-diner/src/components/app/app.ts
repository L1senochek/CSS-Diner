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

export class App {
  constructor() {
    this.createView();
  }

  createView() {
    const footerView = new FooterView();
    // document.body.append(footerView.getHTMLElement())
    const footerElement = footerView.getHTMLElement();
    if (footerElement) document.body.prepend(footerElement);

    
    const mainView = new MainView();
    const mainElement = mainView.getHTMLElement();
    const mainWrapper = mainElement?.firstChild;

    const gameView = new GameView().getHTMLElement();
    if (gameView && mainWrapper instanceof HTMLElement) mainWrapper.prepend(gameView);
    console.log(gameView);
    // сюда добавлять все что в game
    const lanternView = new LanternView().getHTMLElement();
    // изменяемый параметр:
    const gameQuestView = new GameQuestView().getHTMLElement();
    const tableView = new TableView().getHTMLElement();
    // изменяемый параметр:
    const tableContent = tableView?.childNodes[1];
    const chopsticksView = new ChopsticksView().getHTMLElement();
    const editorView = new EditorView().getHTMLElement();
    
    const editorCodeView = new EditorCodeView().getHTMLElement();
    const markupView = new MarkupView().getHTMLElement();

    
    const editorWindowCSS = editorView?.childNodes[0].childNodes[1];
    const editorWindowHtml = editorView?.childNodes[1].childNodes[1];

    
    if (editorCodeView instanceof HTMLElement) editorWindowCSS?.appendChild(editorCodeView)
    if (markupView instanceof HTMLElement) editorWindowHtml?.appendChild(markupView)

    // изменяемый параметр ( input ):
    const editorInputCSS = editorCodeView?.firstChild?.firstChild;
    // const editorCodeHtml = editorView?.childNodes[1].childNodes[1];
    console.log(editorWindowHtml?.childNodes, markupView);
    
    if (
      lanternView
      && gameView instanceof HTMLElement
      && gameQuestView instanceof HTMLElement
      && tableView instanceof HTMLElement
      && chopsticksView instanceof HTMLElement
      && editorView instanceof HTMLElement
      ) {
      gameView.prepend(
        lanternView,
        gameQuestView,
        tableView,
        chopsticksView,
        editorView
      );
    }

    if (mainElement) document.body.prepend(mainElement);
    
    const headerView = new HeaderView();
    const headerElement = headerView.getHTMLElement();
    
    if (headerElement) document.body.prepend(headerElement);
  }
}