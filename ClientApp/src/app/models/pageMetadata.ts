export class PageMetadata {
  constructor(
    public pageId: string,
    public title: string,
    public lastUpdateTime: Date,
  ) {}

  public static newEmpty(): PageMetadata {
    return new PageMetadata('', '', new Date());
  }
}
