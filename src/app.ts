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

    this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=uWsmRIf7tmo'));
    this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=EUZ8YUxhMNM'));
    this.page.addChild(new NoteComponent('Note Title', 'Why is Typescript so hard?'));
    this.page.addChild(
      new ImageComponent(
        'Image Title',
        'https://blog.kakaocdn.net/dn/cKLyPD/btrcVjgL9M7/N0KfsqEVQipTSkuSmCsXz1/05-%EC%82%B0%EA%B3%BC%EB%85%B8%EC%9D%84-C-Blue%20Sky-%ED%95%98%EB%8A%98%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4.png?attach=1&knm=img.png'
      )
    );
    this.page.addChild(new ImageComponent('Image Title', 'https://blog.kakaocdn.net/dn/XlVZH/btqIH50as13/LwCnDkeRzRz9kETtUMaHyk/img.jpg'));
    this.page.addChild(new TodoComponent('Todo Title', 'Bob eat!'));
    this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=7nrDM-ujIHo'));
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
