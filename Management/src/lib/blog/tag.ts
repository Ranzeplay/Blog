import { MGMT_REQ_HEADER } from "../constants";

export type CreateTagViewModel = {
  name: string;
  slug: string;
};

export type TagViewModel = {
  slug: string;
  name: string;
  articleSlugs: string[];
  postSlugs: string[];
};

export class TagService {
  public static async create(model: CreateTagViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/tag/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<TagViewModel[]> {
    const response = await fetch(process.env.BACKEND_URL + "/api/tag/index", {
      headers: MGMT_REQ_HEADER,
      method: "GET",
    });

    return response.json();
  }
}
