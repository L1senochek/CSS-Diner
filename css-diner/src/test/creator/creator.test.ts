import CreatorElement from '../../components/creator/creator';

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

    test('getElement should return the created element', () => {
      const element = creatorElement.getElement();

      expect(element).toBeDefined();
      expect(element.tagName).toBe('DIV');
      expect(element.classList.contains('test-class')).toBe(true);
      expect(element.innerText).toBe('Test element');
    });

    test('getElement should throw an error if the element is null', () => {
      creatorElement.elem = null;

      expect(() => {
        creatorElement.getElement();
      }).toThrow(Error);
    });

  });

  describe('createElem method: ', () => {
    test('createElem should create the element with provided tag', () => {
      const elementParam = {
        tag: 'span',
        classNames: ['test-class'],
      };
  
      creatorElement.createElem(elementParam);
  
      const element = creatorElement.getElement();
      expect(element).toBeDefined();
      expect(element.tagName).toBe('SPAN');
    });
  
    test('createElem should add the provided CSS classes to the element', () => {
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
  
    test('createElem should set the inner text of the element if provided', () => {
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
  
    test('createElem should set the attributes of the element if provided', () => {
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
