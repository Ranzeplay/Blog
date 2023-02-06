import { ArticleMetadata } from './articleMetadata';

export class Article {
  constructor(public metadata: ArticleMetadata, public content: string) {}
}
