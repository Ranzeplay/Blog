export class Article {
  public constructor(
    public metadata: ArticleMetadata,
    public content: string
  ) {}
}

export class ArticleMetadata {
  public constructor(
    public id: string,
    public title: string,
    public shortContent: string,
    public publishTime: Date,
    public categoryName: string,
    public tags: string[]
  ) {}
}
