import DiaLogComponet from './components/dialog/dialog.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const btn = document.querySelector('.control-panel');
    btn?.addEventListener('click', this.btnClickHandler);
  }
  btnClickHandler = (event: Event) => {
    const target = event.target as Element;
    if (event.currentTarget !== event.target) {
      const dialog = new DiaLogComponet();
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });
      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 추가
        dialog.removeFrom(document.body);
      });
      switch (target.id) {
        case 'new-video':
          dialog.setOnInputListner((title: string, contents: string) => {
            const video = new VideoComponent(title, contents);
            this.page.addChild(video);
          });
          break;
        case 'new-image':
          dialog.setOnInputListner((title: string, contents: string) => {
            const image = new ImageComponent(title, contents);
            this.page.addChild(image);
          });
          break;
        case 'new-note':
          dialog.setOnInputListner((title: string, contents: string) => {
            const note = new NoteComponent(title, contents);
            this.page.addChild(note);
          });
          break;
        case 'new-todo':
          dialog.setOnInputListner((title: string, contents: string) => {
            const todo = new TodoComponent(title, contents);
            this.page.addChild(todo);
          });
          break;
        default:
          break;
      }
      dialog.attachTo(document.body);
    }
  };
}

new App(document.querySelector('.document')! as HTMLElement);

// 'https://picsum.photos/600/300'
