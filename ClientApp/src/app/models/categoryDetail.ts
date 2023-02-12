import { ArticleMetadata } from './articleMetadata';

export class CategoryDetail {
  constructor(public name: string, public articles: ArticleMetadata[]) {}
}
