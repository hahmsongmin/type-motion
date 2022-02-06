import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    image.attachTo(appRoot, 'beforeend');

    const video = new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=H9-ekUCFCr0');
    video.attachTo(appRoot, 'beforeend');

    const note = new NoteComponent('Note Title', 'Hello, I can do it!!');
    note.attachTo(appRoot, 'beforeend');

    const todo = new TodoComponent('Todo title', 'TypeScript Master!!');
    todo.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
