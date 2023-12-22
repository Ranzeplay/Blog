export class ArticleOverviewViewModel {
  constructor(
    public id: string,
    public title: string,
    public shortContent: string,
    public publishTime: Date,
    public categoryName: string,
    public tags: string[]
  ) {}
}
