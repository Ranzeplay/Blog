export class PageMetadata {
  constructor(
    public pageId: string,
    public title: string,
    public lastUpdateTime: Date,
    public draft: boolean
  ) {}

  public static newEmpty(): PageMetadata {
    return new PageMetadata('', '', new Date(), false);
  }
}
