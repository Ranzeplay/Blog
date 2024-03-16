import { ArticleService, CreateArticleViewModel } from "@/lib/blog/article";
import { TagService } from "@/lib/blog/tag";
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
  
  // Create non-existing tags automatically
  let existingTags = await TagService.list();
  for (let tagSlug of data.tagSlugs) {
    if (!existingTags.some((t) => t.slug == tagSlug)) {
      await TagService.create({
        name: tagSlug,
        slug: tagSlug,
      });
    }
  }

  const result = await ArticleService.create(data);
  res.status(200).json(result);
}
