import BaseComponent from '../component.js';

class MediaSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
          <div class="form__container">
            <label for="title">Title</label>
            <input type="text" id="title" />
          </div>
        <div class="form__container">
          <label for="url">URL</label>
          <input type="text" id="url">
        </div>
      </div>`);
  }

  get title(): string {
    const inputElement = this.element.querySelector('#title')! as HTMLInputElement;
    return inputElement.value;
  }

  get url(): string {
    const inputElement = this.element.querySelector('#url')! as HTMLInputElement;
    return inputElement.value;
  }
}

export default MediaSectionInput;
