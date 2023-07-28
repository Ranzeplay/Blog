import { ArticleMetadata } from './articleMetadata';

export class Article {
  constructor(public metadata: ArticleMetadata, public content: string) {}

  public static newEmpty(): Article {
    return new Article(ArticleMetadata.newEmpty(), '');
  }
}
