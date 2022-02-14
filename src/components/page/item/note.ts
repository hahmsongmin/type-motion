import BaseComponent from '../../component.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, content: string) {
    super(`<section class="note">
            <h2 class="page-item__title note__title"></h2>  
            <p class="note__body"></p>
        </section>`);
    const noteTitle = this.element.querySelector('.note__title')! as HTMLHeadingElement;
    noteTitle.textContent = title;
    const note = this.element.querySelector('.note__body')! as HTMLParagraphElement;
    note.textContent = content;
  }
}
