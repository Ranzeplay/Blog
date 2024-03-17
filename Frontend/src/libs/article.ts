import { createEmptyCategoryViewModel, type CategoryViewModel } from "./category";
import type { TagViewModel } from "./tag";

export type ArticleViewModel = {
  title: string;
  slug: string;
  publishTime: Date;
  lastModifiedTime: Date;
  tags: TagViewModel[];
  category: CategoryViewModel;
  content: string;
};

export const emptyArticle: ArticleViewModel = {
  title: "",
  slug: "",
  publishTime: new Date(),
  lastModifiedTime: new Date(),
  tags: [],
  category: createEmptyCategoryViewModel(),
  content: "",
};
