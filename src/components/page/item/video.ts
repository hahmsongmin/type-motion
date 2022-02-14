import BaseComponent from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLIFrameElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h3 class="page-item__title video__title"></h3>
        </section>`);
    const youtubeTitle = this.element.querySelector('.video__title') as HTMLHeadingElement;
    youtubeTitle.textContent = title;
    const youtube = this.element.querySelector('.video__iframe') as HTMLIFrameElement;
    youtube.src = this.convertToEmbededURL(url);
  }

  private convertToEmbededURL(url: string): string {
    const regExp = /https?:\/\/(?:www.)?youtu(?:be)?\.[com|be]+\/(?:watch\?v=)?(?:embed\/)?([a-zA-Z0-9-]{11})/;
    const [, youtubeId] = url.match(regExp) as Array<string>;
    return `https://www.youtube.com/embed/${youtubeId}`;
  }
}
