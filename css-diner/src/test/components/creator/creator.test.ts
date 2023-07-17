import CreatorElement from '../../../components/creator/creator';

describe('CreatorElement: ', () => {
  let creatorElement: CreatorElement;

  beforeEach(() => {
    const elementParam = {
      tag: 'div',
      classNames: ['test-class'],
      innerText: 'Test element',
    };
    creatorElement = new CreatorElement(elementParam);
  });

  describe('getElement method: ', () => {
    test('should return newly created element with test params', () => {
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.tagName).toBe('DIV');
      expect(element.classList.contains('test-class')).toBe(true);
      expect(element.innerText).toBe('Test element');
    });

    test('should throw an error if newly created element is null', () => {
      creatorElement.elem = null;
      expect(() => {
        creatorElement.getElement();
      }).toThrow(Error);
    });
  });

  describe('createElem method: ', () => {
    test('should create element with test tag', () => {
      const elementParam = {
        tag: 'span',
        classNames: ['test-class'],
      };
      creatorElement.createElem(elementParam);
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.tagName).toBe('SPAN');
    });

    test('should add test classes to created element', () => {
      const elementParam = {
        tag: 'div',
        classNames: ['test-class1', 'test-class2'],
      };
      creatorElement.createElem(elementParam);
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.classList.contains('test-class1')).toBe(true);
      expect(element.classList.contains('test-class2')).toBe(true);
    });

    test('should add test innerText to created element', () => {
      const elementParam = {
        tag: 'div',
        classNames: ['test-class'],
        innerText: 'Test element',
      };
      creatorElement.createElem(elementParam);
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.innerText).toBe('Test element');
    });

    test('should add test attributes to created element', () => {
      const elementParam = {
        tag: 'input',
        classNames: ['test-class'],
        attributes: {
          type: 'text',
          placeholder: 'Enter text',
        },
      };
      creatorElement.createElem(elementParam);
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.getAttribute('type')).toBe('text');
      expect(element.getAttribute('placeholder')).toBe('Enter text');
    });
  });
});
