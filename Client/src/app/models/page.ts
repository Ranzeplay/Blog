import { PageMetadata } from './pageMetadata';

export class Page {
  constructor(public metadata: PageMetadata, public content: string) {}

  public static newEmpty(): Page {
    return new Page(PageMetadata.newEmpty(), '');
  }
}
