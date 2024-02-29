import { MGMT_REQ_HEADER } from "../constants";

export type ProjectViewModel = {
  id: string;
  slug: string;
  name: string;
  description: string;
  introduction: string;
  iconUrl: string;
  headImageUrl: string;
  siteUrl: string;
  externalUrls: Record<string, string>;
};

export type CreateProjectViewModel = {
  name: string;
  slug: string;
  description: string;
  introduction: string;
  iconUrl: string;
  headImageUrl: string;
  siteUrl: string;
  externalUrls: Record<string, string>;
};

export class ProjectService {
  public static async create(model: CreateProjectViewModel): Promise<boolean> {
    let result = await fetch(process.env.BACKEND_URL + "/api/project/create", {
      headers: MGMT_REQ_HEADER,
      method: "POST",
      body: JSON.stringify(model),
    });

    return result.ok;
  }

  public static async list(): Promise<ProjectViewModel[]> {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/project/index",
      {
        headers: MGMT_REQ_HEADER,
        method: "GET",
      }
    );

    return response.json();
  }
}
