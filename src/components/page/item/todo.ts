import BaseComponent from '../../component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`
            <section class="todo">
                <h2 class="todo__title"></h2>
                <input id="todo" type="checkbox" />
                  <label for="todo" class="todo-checkbox">
                  </label>
                </div>
            </section>
        `);
    const toDoTitle = this.element.querySelector('.todo__title')! as HTMLHeadingElement;
    toDoTitle.textContent = title;
    const toDo = this.element.querySelector('.todo-checkbox')! as HTMLLabelElement;
    toDo.textContent = todo;
  }
}
