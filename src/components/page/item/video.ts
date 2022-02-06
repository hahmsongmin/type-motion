import BaseComponent from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLIFrameElement> {
  constructor(title: string, url: string) {
    super(
      `<section class="video">
        <h3 class="video__title"></h3>
        <div class="video__player"><iframe class="youtube__iframe" width="600" height="300" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe></div>
       <section>`
    );
    const youtubeTitle = this.element.querySelector('.video__title') as HTMLHeadingElement;
    youtubeTitle.textContent = title;
    const youtube = this.element.querySelector('.youtube__iframe') as HTMLIFrameElement;
    youtube.src = this.convertToEmbededURL(url);
  }

  private convertToEmbededURL(url: string): string {
    const regExp = /https?:\/\/(?:www.)?youtu(?:be)?\.[com|be]+\/(?:watch\?v=)?(?:embed\/)?([a-zA-Z0-9-]{11})/;
    const [, youtubeId] = url.match(regExp) as Array<string>;
    return `https://www.youtube.com/embed/${youtubeId}`;
  }
}
