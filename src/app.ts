import { Component } from './components/component.js';
import DiaLogComponet, { MediaData, TextData } from './components/dialog/dialog.js';
import MediaSectionInput from './components/dialog/media-input.js';
import TextSectionInput from './components/dialog/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const btn = document.querySelector('.control-panel');
    btn?.addEventListener('click', this.btnClickHandler);
  }

  private bindElementToDialog = <T extends (MediaData | TextData) & Component>(inputComponent: InputComponentConstructor<T>, makeSection: (input: T) => Component) => {
    const dialog = new DiaLogComponet();
    const inputSection = new inputComponent();
    dialog.addChild(inputSection);
    dialog.setOnCloseListener(() => {
      dialog.removeFrom(this.dialogRoot);
    });
    dialog.setOnSubmitListener(() => {
      const video = makeSection(inputSection);
      this.page.addChild(video);
      dialog.removeFrom(this.dialogRoot);
    });
    dialog.attachTo(this.dialogRoot);
  };

  btnClickHandler = (event: Event) => {
    const target = event.target as Element;
    if (event.currentTarget !== event.target) {
      switch (target.id) {
        case 'new-video':
          this.bindElementToDialog(MediaSectionInput, (input: MediaSectionInput) => new VideoComponent(input.title, input.url));
          break;
        case 'new-image':
          this.bindElementToDialog(MediaSectionInput, (input: MediaSectionInput) => new ImageComponent(input.title, input.url));
          break;
        case 'new-note':
          this.bindElementToDialog(TextSectionInput, (input: TextSectionInput) => new NoteComponent(input.title, input.body));
          break;
        case 'new-todo':
          this.bindElementToDialog(TextSectionInput, (input: TextSectionInput) => new TodoComponent(input.title, input.body));
          break;
        default:
          break;
      }
    }
  };
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
