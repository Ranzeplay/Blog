import { ArticleMetadata } from './articleMetadata';

export class TagDetail {
  constructor(public name: string, public articles: ArticleMetadata[]) {}
}
