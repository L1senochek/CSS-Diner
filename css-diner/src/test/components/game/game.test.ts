import { GameView } from '../../../components/view/main/game/game';
import { ElementParam } from '../../../types/creator/creator';

describe('GameView: ', () => {
  let game: GameView;

  beforeEach(() => {
    const elementParam: ElementParam = {
      tag: 'div',
      classNames: ['test-class'],
      innerText: 'Test element',
    };
    game = new GameView(elementParam);
  });

  describe('clearInput', () => {
    test('should clear the input field value if it is an HTMLInputElement', () => {
      const inputValue = 'value';
      const inputField = document.createElement('input');
      inputField.value = inputValue;
      game.editorCodeView.inputField = inputField;
      game.clearInput();
      if (game.editorCodeView.inputField instanceof HTMLInputElement) {
        expect(game.editorCodeView.inputField.value).toBe('');
      } else {
        fail('inputField is not an HTMLInputElement');
      }
    });
  });
});
