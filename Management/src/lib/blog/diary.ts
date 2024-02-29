import { MGMT_REQ_HEADER } from "../constants";

export type DiaryViewModel = {
  title: string;
  content: string;
  date: Date;
};

export type CreateDiaryViewModel = {
  title: string;
  slug: string;
  tagSlugs: string[];
  categorySlug: string;
  content: string;
};

export class DiaryService {
  public static async create(model: CreateDiaryViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/diary/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<DiaryViewModel[]> {
    const response = await fetch(process.env.BACKEND_URL + "/api/diary/index", {
      headers: MGMT_REQ_HEADER,
      method: "GET",
    });

    return response.json();
  }
}
