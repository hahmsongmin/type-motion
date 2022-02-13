import DiaLogComponet from './components/dialog/dialog.js';
import MediaSectionInput from './components/dialog/media-input.js';
import TextSectionInput from './components/dialog/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const btn = document.querySelector('.control-panel');
    btn?.addEventListener('click', this.btnClickHandler);
  }
  btnClickHandler = (event: Event) => {
    const target = event.target as Element;
    if (event.currentTarget !== event.target) {
      const dialog = new DiaLogComponet();
      const mediaInputSection = new MediaSectionInput();
      const textInputSection = new TextSectionInput();
      switch (target.id) {
        case 'new-video':
          dialog.addChild(mediaInputSection);
          dialog.setOnCloseListener(() => {
            dialog.removeFrom(this.dialogRoot);
          });
          dialog.setOnSubmitListener(() => {
            const video = new VideoComponent(mediaInputSection.title, mediaInputSection.url);
            this.page.addChild(video);
            dialog.removeFrom(this.dialogRoot);
          });
          break;
        case 'new-image':
          dialog.addChild(mediaInputSection);
          dialog.setOnCloseListener(() => {
            dialog.removeFrom(this.dialogRoot);
          });
          dialog.setOnSubmitListener(() => {
            const image = new ImageComponent(mediaInputSection.title, mediaInputSection.url);
            this.page.addChild(image);
            dialog.removeFrom(this.dialogRoot);
          });
          break;
        case 'new-note':
          dialog.addChild(textInputSection);
          dialog.setOnCloseListener(() => {
            dialog.removeFrom(this.dialogRoot);
          });
          dialog.setOnSubmitListener(() => {
            const note = new NoteComponent(textInputSection.title, textInputSection.body);
            this.page.addChild(note);
            dialog.removeFrom(this.dialogRoot);
          });
          break;
        case 'new-todo':
          dialog.addChild(textInputSection);
          dialog.setOnCloseListener(() => {
            dialog.removeFrom(this.dialogRoot);
          });
          dialog.setOnSubmitListener(() => {
            const todo = new TodoComponent(textInputSection.title, textInputSection.body);
            this.page.addChild(todo);
            dialog.removeFrom(this.dialogRoot);
          });
          break;
        default:
          break;
      }
      dialog.attachTo(this.dialogRoot);
    }
  };
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
