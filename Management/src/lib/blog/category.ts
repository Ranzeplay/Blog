import { MGMT_REQ_HEADER } from "../constants";

export type CategoryViewModel = {
  slug: string;
  name: string;
  articleSlugs: string[];
};

export type CreateCategoryViewModel = {
  name: string;
  slug: string;
};

export class CategoryService {
  public static async create(model: CreateCategoryViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/category/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<CategoryViewModel[]> {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/category/index",
      {
        headers: MGMT_REQ_HEADER,
        method: "GET",
      }
    );

    return response.json();
  }
}
