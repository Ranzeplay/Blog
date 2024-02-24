import { ArticleService } from "@/app/services/articleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { articleId: string } }
) {
  const article = await ArticleService.getInstance().getArticle(
    params.articleId as string
  );

  return NextResponse.json(article);
}
