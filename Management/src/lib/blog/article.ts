import { MGMT_REQ_HEADER } from "../constants";
import { CategoryViewModel } from "./category";
import { TagViewModel } from "./tag";

export type CreateArticleViewModel = {
  title: string;
  slug: string;
  tagSlugs: string[];
  categorySlug: string;
  content: string;
};

export type ArticleViewModel = {
  title: string;
  slug: string;
  publishTime: Date;
  lastModifiedTime: Date;
  tags: TagViewModel[];
  category: CategoryViewModel;
  content: string;
};

export class ArticleService {
  public static async create(model: CreateArticleViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/article/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<ArticleViewModel[]> {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/article/index",
      {
        headers: MGMT_REQ_HEADER,
        method: "GET",
      }
    );

    return response.json();
  }
}
