import BaseComponent, { Component } from '../component.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
type OnInputListener = (title: string, contents: string) => void;

class DiaLogComponet extends BaseComponent<HTMLElement> implements Composable {
  private closeListener!: OnCloseListener;
  private submitListener!: OnSubmitListener;
  private inputListener!: OnInputListener;
  private inputTitle!: string;
  private inputContents!: string;
  constructor() {
    super(
      `<dialog class="dialog">
        <div class="dialog__container">
          <button class="close">&times;</button>
          <div id="dialog__body"></div>
          <div class="input">
            <label for="title">Title<input id="title" type="text" /></label>
            <label for="contents">Url<input id="contents" type="text" /></label>
          </div>
          <button class="dialog__submit">ADD</button>
        </div>
       </dialog>`
    );
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    const addBtn = this.element.querySelector('.dialog__submit')! as HTMLButtonElement;
    const inputTitle = this.element.querySelector('#title')! as HTMLInputElement;
    const inputContents = this.element.querySelector('#contents')! as HTMLInputElement;
    inputTitle.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      inputTitle.value = target.value;
      this.inputTitle = target.value;
    };
    inputContents.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      inputContents.value = target.value;
      this.inputContents = target.value;
    };
    closeBtn.onclick = () => {
      this.closeListener();
    };
    addBtn.onclick = () => {
      this.submitListener();
      this.inputListener(this.inputTitle, this.inputContents);
    };
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  setOnInputListner(listener: OnInputListener) {
    this.inputListener = listener;
  }

  addChild(child: Component): void {
    const body = this.element.querySelector('#dialog__body')! as HTMLDivElement;
    child.attachTo(body);
  }
}

export default DiaLogComponet;
