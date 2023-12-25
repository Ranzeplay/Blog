import { Article, ArticleMetadata } from "../models/article";
import { Asset } from "../models/asset";
import { ConfigService } from "./configService";

export class ArticleService {
  private static instance: ArticleService = new ArticleService();
  public static getInstance(): ArticleService {
    return ArticleService.instance;
  }

  public constructor() {
    console.log("Initializing ArticleService");
  }

  public async getArticleIndex(): Promise<ArticleMetadata[] | undefined> {
    const response = await fetch(
      `${ConfigService.getBackendExchangeServerAddress()}/api/article/index`,
      {
        headers: {
          Authorization: ConfigService.getAccessToken(),
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }

    return undefined;
  }

  public async getArticle(id: string): Promise<Article | undefined> {
    const response = await fetch(
      `${ConfigService.getBackendExchangeServerAddress()}/api/article/detail?id=${id}`,
      {
        headers: {
          Authorization: ConfigService.getAccessToken(),
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return undefined;
  }

  public async getAsset(id: string, name: string): Promise<Asset | undefined> {
    const response = await fetch(
      `${ConfigService.getBackendExchangeServerAddress()}/api/article/asset/${id}/${name}`,
      {
        headers: {
          Authorization: ConfigService.getAccessToken(),
        },
      }
    );

    if (response.ok) {
      return new Asset(
        name,
        await response.blob(),
        response.headers.get("Content-Type") ?? "application/octet-stream"
      );
    }
    return undefined;
  }
}
