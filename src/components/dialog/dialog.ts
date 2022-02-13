import BaseComponent, { Component } from '../component.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

class DiaLogComponet extends BaseComponent<HTMLElement> implements Composable {
  private closeListener!: OnCloseListener;
  private submitListener!: OnSubmitListener;
  constructor() {
    super(
      `<dialog class="dialog">
        <div class="dialog__container">
          <button class="dialog__close">&times;</button>
          <div id="dialog__body"></div>
          <button class="dialog__submit">ADD</button>
        </div>
       </dialog>`
    );
    const closeBtn = this.element.querySelector('.dialog__close')! as HTMLButtonElement;
    const addBtn = this.element.querySelector('.dialog__submit')! as HTMLButtonElement;

    closeBtn.onclick = () => {
      this.closeListener();
    };
    addBtn.onclick = () => {
      this.submitListener();
    };
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component): void {
    const body = this.element.querySelector('#dialog__body')! as HTMLDivElement;
    child.attachTo(body);
  }
}

export default DiaLogComponet;
