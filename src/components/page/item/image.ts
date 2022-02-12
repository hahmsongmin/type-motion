import BaseComponent from '../../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="image">
      <h2 class="image__title"></h2>
      <div class="image__holder"><img class="image__thumbnail">
      </div>
    </section>
    `);
    const imageTitleEle = this.element.querySelector('.image__title')! as HTMLHeadingElement;
    imageTitleEle.textContent = title;
    const imageEle = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageEle.src = url;
    imageEle.alt = title;
  }
}
