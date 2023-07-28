import { ArticleMetadata } from './articleMetadata';

export class CategoryDetail {
  constructor(public name: string, public articles: ArticleMetadata[]) {}

  public static newEmpty(): CategoryDetail {
    return new CategoryDetail('', []);
  }
}
