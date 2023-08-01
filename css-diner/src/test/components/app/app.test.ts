import { App } from '../../../components/app/app';
import { LvlRangeStatus } from '../../../types/app/app';

describe('App', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  test('checkLvlRange should increase lvl and call nextLvl on lvlAboutView when status is INCREASE and lvl is less than the length of lvlJSON', () => {
    const nextLvlMock = jest.spyOn(app.lvlAboutView, 'nextLvl');
    app.checkLvlRange(LvlRangeStatus.INCREASE);

    expect(app.lvl).toBe(1);
    expect(nextLvlMock).toHaveBeenCalledWith(app.lvl, expect.any(Function));
  });

  test('checkLvlRange should decrease lvl and call prevLvl on lvlAboutView when status is DECREASE and lvl is greater than 0', () => {
    const prevLvlMock = jest.spyOn(app.lvlAboutView, 'prevLvl');
    app.lvl = 2;
    app.checkLvlRange(LvlRangeStatus.DECREASE);

    expect(app.lvl).toBe(1);
    expect(prevLvlMock).toHaveBeenCalledWith(app.lvl, expect.any(Function));
  });

  test('checkLvlRange should not change lvl or call nextLvl or prevLvl when status is DECREASE and lvl is equal to 0', () => {
    const prevLvlMock = jest.spyOn(app.lvlAboutView, 'prevLvl');
    app.checkLvlRange(LvlRangeStatus.DECREASE);

    expect(app.lvl).toBe(0);
    expect(prevLvlMock).not.toHaveBeenCalled();
  });
});
