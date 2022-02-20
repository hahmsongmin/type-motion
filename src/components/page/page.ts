import BaseComponent, { Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type updateMute = 'mute' | 'unmute';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListner(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: updateMute): void;
  getBoundingClientRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener!: OnCloseListener;
  private dragStateListener!: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`
        <li class="page-item" draggable="true">
          <section class="page-item__body"></section>
          <div class="page-item__controls">
            <button class="close">&times;</button>
          </div>
        </li>
    `);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
    this.element.classList.add('dragging');
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
    this.element.classList.remove('dragging');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
    this.element.classList.add('drop-area');
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
    this.element.classList.remove('drop-area');
  }
  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragStateListner(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
  muteChildren(state: updateMute) {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
  getBoundingClientRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
  onDropped() {
    this.element.classList.remove('drop-area');
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  private children = new Set<SectionContainer>();
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.dropTarget == null) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingClientRect();
      const position: InsertPosition = dropY < srcElement.y ? 'beforebegin' : 'afterend';
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, position);
    }
    this.dropTarget.onDropped();
  }
  addChild(section: Component): void {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element);
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListner((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updateSection('mute');
          break;
        case 'stop':
          this.dragTarget = undefined;
          this.updateSection('unmute');
          break;
        case 'enter':
          console.log('enter', target);
          this.dropTarget = target;
          break;
        case 'leave':
          console.log('leave', target);
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state :  ${state}`);
      }
    });
  }
  private updateSection(state: updateMute) {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
