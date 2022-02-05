import BaseComponent from '../../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="image">
      <div class="image__holder"><img class="image__thumbnail"></div>
      <p class="image__title"></p>
    </section>
    `);
    const imageEle = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageEle.src = url;
    imageEle.alt = title;
    const imageTitleEle = this.element.querySelector('.image__title')! as HTMLParagraphElement;
    imageTitleEle.textContent = title;
  }
}
