import { ArticleService, CreateArticleViewModel } from "@/lib/blog/article";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const data = req.body as CreateArticleViewModel;
  const result = await ArticleService.create(data);
  res.status(200).json(result);
}
