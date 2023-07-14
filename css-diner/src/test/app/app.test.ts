import { App } from "../../components/app/app";
import lvlJSON from '../../components/data/levels.json';

describe('App: ', () => {
  let app: App;
  
  beforeEach(() => {
    app = new App();
    app.lvlAboutView.lvlProgress = document.createElement('div');
  });

  describe('nextLvl: ', () => {
    test('should increment the level if it is not the last level', () => {
      const initialLevel = app.lvl;
      const expectedLevel = initialLevel + 1;
      app.nextLvl();
      expect(app.lvl).toBe(expectedLevel);
    });

    test('should not increment the level if it is the last level', () => {
      app.lvl = lvlJSON.length - 1;
      const expectedLevel = app.lvl;
      app.nextLvl();
      expect(app.lvl).toBe(expectedLevel);
    });
  });

  describe('prevLvl', () => {
    test('should not decrement the level if it is already 0', () => {
      const initialLevel = app.lvl;
      app.prevLvl();
      expect(app.lvl).toEqual(initialLevel);
    });
  });

  describe('clearInput', () => {
    test('should clear the input field value if it is an HTMLInputElement', () => {
      const inputValue = 'value';
      const inputField = document.createElement('input');
      inputField.value = inputValue;
      app.editorCodeView.inputField = inputField;
      app.clearInput();
      if (app.editorCodeView.inputField instanceof HTMLInputElement) {
        expect(app.editorCodeView.inputField.value).toBe('');
      } else {
        fail('inputField is not an HTMLInputElement');
      }
    });
  });

  describe('toLvl', () => {
    test('should set the level to the specified number', () => {
      const num = 2;
      app.toLvl(num);
      expect(app.lvl).toEqual(num);
    });
  });

  describe('changeProgressBar', () => {
    test('should update the width of the progress bar based on the current level', () => {
      const num = app.lvl;
      const expectedWidth = ((num + 1) / lvlJSON.length) * 100;
      app.changeProgressBar();
      expect(app.lvlAboutView.lvlProgress?.style.width).toBe(`${expectedWidth}%`);
    });
  
    test('should update the width of the progress bar based on the specified number', () => {
      const num = 4;
      const expectedWidth = ((num + 1) / lvlJSON.length) * 100;
      app.changeProgressBar(num);
      expect(app.lvlAboutView.lvlProgress?.style.width).toBe(`${expectedWidth}%`);
    });
  });
});
