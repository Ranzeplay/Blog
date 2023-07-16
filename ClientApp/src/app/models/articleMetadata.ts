export class ArticleMetadata {
  constructor(
    public articleId: string,
    public title: string,
    public time: Date,
    public category: string,
    public tags: string[],
    public draft: boolean
  ) {}

  public static newEmpty(): ArticleMetadata {
    return new ArticleMetadata('', '', new Date(), '', [], false);
  }
}
