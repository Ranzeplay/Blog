import { MGMT_REQ_HEADER } from "../constants";

export type PostViewModel = {
  title: string;
  slug: string;
  publishTime: Date;
  lastModifiedTime: Date;
  tags: string[];
  content: string;
};

export type CreatePostViewModel = {
  title: string;
  slug: string;
  tagSlugs: string[];
  categorySlug: string;
  content: string;
};

export class PostService {
  public static async create(model: CreatePostViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/post/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<PostViewModel[]> {
    const response = await fetch(process.env.BACKEND_URL + "/api/post/index", {
      headers: MGMT_REQ_HEADER,
      method: "GET",
    });

    return response.json();
  }
}
