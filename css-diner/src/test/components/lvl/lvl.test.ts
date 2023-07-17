import { App } from '../../../components/app/app';
import { LvlAboutView } from '../../../components/view/main/lvl/lvl';
import { ElementParam } from '../../../types/creator/creator';
import lvlJSON from '../../../components/data/levels.json';
import { LvlStatus, StatusToogleRemove } from '../../../types/app/app';

describe('LvlAboutView: ', () => {
  let app: App;
  let lvlAboutView: LvlAboutView;

  beforeEach(() => {
    const elementParam: ElementParam = {
      tag: 'div',
      classNames: ['test-class'],
      innerText: 'Test element',
    };
    app = new App();
    lvlAboutView = new LvlAboutView(elementParam);
  });

  describe('changeCheckmark: ', () => {
    test('changeCheckmark should add "completed" class when level status is STATUS_COMPLETED', () => {
      lvlAboutView.lvlTitle.lvlCheckmark.classList.add('with-hint');
      lvlAboutView.changeCheckmark([LvlStatus.STATUS_COMPLETED], 0);

      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('completed')).toBe(true);
      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('with-hint')).toBe(false);
    });

    test('changeCheckmark should remove "completed" and "with-hint" classes when level status is STATUS_NOT_COMPLETED', () => {
      lvlAboutView.lvlTitle.lvlCheckmark.classList.add('completed', 'with-hint');
      lvlAboutView.changeCheckmark([LvlStatus.STATUS_NOT_COMPLETED], 0);

      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('completed')).toBe(false);
      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('with-hint')).toBe(false);
    });

    test('changeCheckmark should add "with-hint" class when level status is STATUS_COMPLETED_WITH_HINT', () => {
      lvlAboutView.lvlTitle.lvlCheckmark.classList.add('completed');
      lvlAboutView.changeCheckmark([LvlStatus.STATUS_COMPLETED_WITH_HINT], 0);

      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('completed')).toBe(false);
      expect(lvlAboutView.lvlTitle.lvlCheckmark.classList.contains('with-hint')).toBe(true);
    });
  });
  // describe('nextLvl: ', () => {
  //   test('should test that nextLvl method increase current lvl by one', () => {
  //     const initialLevel = app.lvl;
  //     const expectedLevel = initialLevel + 1;
  //     lvlAbout.nextLvl(app.lvl, app.renderLvl);
  //     expect(app.lvl).toBe(expectedLevel);
  //   });

  //   test('should test that nextLvl method can`t increase level more than maximum', () => {
  //     app.lvl = lvlJSON.length;
  //     const expectedLevel = app.lvl;
  //     lvlAbout.nextLvl(app.lvl, app.renderLvl);
  //     expect(app.lvl).toBe(expectedLevel);
  //   });
  // });

  // describe('prevLvl', () => {
  //   test('should test that prevLvl method can`t decrease level less than minimum', () => {
  //     const initialLevel = app.lvl;
  //     lvlAbout.prevLvl(app.lvl, app.renderLvl);
  //     expect(app.lvl).toEqual(initialLevel);
  //   });
  // });

  // describe('toLvl', () => {
  //   test('should test that toLvl method set the level to the specified number', () => {
  //     const num = 2;
  //     lvlAbout.toLvl(app.lvl, app.renderLvl);
  //     expect(app.lvl).toEqual(num);
  //   });
  // });

  describe('changeProgressBar', () => {
    test('should update the width of the progress bar based on the current level', () => {
      const num = app.lvl;
      const expectedWidth = ((num + 1) / lvlJSON.length) * 100;
      lvlAboutView.changeProgressBar(app.lvl);
      expect(lvlAboutView.lvlProgress.style.width).toEqual(`${expectedWidth}%`);
    });

    test('should update the width of the progress bar in case when provided num = 4', () => {
      const num = 4;
      const expectedWidth = ((num + 1) / lvlJSON.length) * 100;
      lvlAboutView.changeProgressBar(num);
      expect(lvlAboutView.lvlProgress.style.width).toBe(`${expectedWidth}%`);
    });
  });

  describe('changeProgressBar', () => {
    test('changeBurgerClass should add "active" class on burger and curtainBurger elements when status is TOOGLE', () => {
      lvlAboutView.changeBurgerClass(StatusToogleRemove.TOOGLE);

      expect(lvlAboutView.lvlTitle.burger.classList.contains('active')).toBe(true);
      expect(lvlAboutView.curtainBurger.classList.contains('active')).toBe(true);
    });

    test('changeBurgerClass should remove "active" class from burger and curtainBurger elements when status is REMOVE', () => {
      lvlAboutView.lvlTitle.burger.classList.add('active');
      lvlAboutView.curtainBurger.classList.add('active');
      lvlAboutView.changeBurgerClass(StatusToogleRemove.REMOVE);

      expect(lvlAboutView.lvlTitle.burger.classList.contains('active')).toBe(false);
      expect(lvlAboutView.curtainBurger.classList.contains('active')).toBe(false);
    });

    test('changeBurgerClass should clear innerHTML of curtainBurger', () => {
      lvlAboutView.curtainBurger.innerHTML = '<li>Item 1</li><li>Item 2</li>';
      lvlAboutView.changeBurgerClass(StatusToogleRemove.TOOGLE);

      expect(lvlAboutView.curtainBurger.innerHTML).toBe('');
    });
  });
});
