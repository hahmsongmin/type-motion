import BaseComponent from '../component.js';

class TextSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
          <div class="form__container">
            <label for="title">Title</label>
            <input type="text" id="title" />
          </div>
        <div class="form__container">
          <label for="body">Body</label>
          <textarea type="text" row="3" id="body"></textarea>
        </div>
      </div>`);
  }

  get title(): string {
    const inputElement = this.element.querySelector('#title')! as HTMLInputElement;
    return inputElement.value;
  }

  get body(): string {
    const inputElement = this.element.querySelector('#body')! as HTMLTextAreaElement;
    return inputElement.value;
  }
}

export default TextSectionInput;
