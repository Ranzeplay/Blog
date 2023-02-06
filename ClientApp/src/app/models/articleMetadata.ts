export class ArticleMetadata {
  constructor(
    public title: string,
    public time: Date,
    public category: string,
    public tags: string[]
  ) {}
}
