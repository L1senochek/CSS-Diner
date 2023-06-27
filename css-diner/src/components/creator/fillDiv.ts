import { Callback, ElementParam } from "./creator";

export class ElementFilled {
  createDiv(
    tag: string,
    classNames: string[],
    innerText?: string,
    callback?: Callback<Event> | null,
    attributes?: {
      type: string,
      placeholder: string,
    },
  ): ElementParam {
    return {
      tag: tag,
      classNames: classNames,
      innerText: innerText,
      callback: callback,
      attributes: attributes,
    };
  }
}