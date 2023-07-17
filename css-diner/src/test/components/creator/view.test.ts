import CreatorElement from '../../../components/creator/creator';
import { View } from '../../../components/creator/view';
import { ElementParam } from '../../../types/creator/creator';

describe('View: ', () => {
  let view: View;
  let creatorElementMock: CreatorElement;

  beforeEach(() => {
    const elementParam: ElementParam = {
      tag: 'div',
      classNames: ['test-class'],
      innerText: 'Test element',
    };
    creatorElementMock = new CreatorElement(elementParam);
    view = new View(elementParam);
    view.createView = jest.fn(() => creatorElementMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHTMLElement method: ', () => {
    test('should return the same element from CreatorElement class', () => {
      const element = view.getHTMLElement();
      expect(element).toBeDefined();
      expect(element).toStrictEqual(creatorElementMock.getElement());
    });
  });

  describe('createView method: ', () => {
    test('should create new instance of CreatorElement', () => {
      const elementParam: ElementParam = {
        tag: 'div',
        classNames: ['test-class'],
        innerText: 'Test element',
      };
      const creatorElement = view.createView(elementParam);
      expect(creatorElement.getElement()).toBeDefined();
      expect(creatorElement).toBeInstanceOf(CreatorElement);
      expect(creatorElement.getElement().tagName).toBe('DIV');
      expect(creatorElement.getElement().classList.contains('test-class')).toBe(true);
      expect(creatorElement.getElement().innerText).toBe('Test element');
    });
  });

  describe('getPropertyElem method: ', () => {
    test('should return the element with test params if it is an instance of HTMLElement', () => {
      const element = document.createElement('div');
      const result = view.getPropertyElem(element);
      expect(result).toBeInstanceOf(HTMLElement);
    });

    test('and should throw an error if it`s null', () => {
      const element = null;
      expect(() => {
        view.getPropertyElem(element);
      }).toThrow(Error);
    });
  });

  describe('appendElems method: ', () => {
    test('should append HTMLElements to the view class property element', () => {
      const element1 = document.createElement('p');
      const element2 = document.createElement('span');
      view.appendElems([element1, element2]);
      expect(view.getHTMLElement().innerHTML).toContain(element1.outerHTML);
      expect(view.getHTMLElement().innerHTML).toContain(element2.outerHTML);
    });

    test('should create and append instances of CreatorElements to the view class prorerty element', () => {
      const elementParam1: ElementParam = {
        tag: 'div',
        classNames: ['test-class'],
        innerText: 'Test element 1',
      };
      const elementParam2: ElementParam = {
        tag: 'p',
        classNames: ['test-class'],
        innerText: 'Test element 2',
      };
      const elementParam3: ElementParam = {
        tag: 'span',
        classNames: ['test-class'],
        innerText: 'Test element 3',
      };
      view.appendElems([elementParam1, elementParam2, elementParam3]);
      expect(view.getHTMLElement().innerHTML).toContain(new CreatorElement(elementParam1).getElement().outerHTML);
      expect(view.getHTMLElement().innerHTML).toContain(new CreatorElement(elementParam2).getElement().outerHTML);
      expect(view.getHTMLElement().innerHTML).toContain(new CreatorElement(elementParam3).getElement().outerHTML);
    });
  });
});
