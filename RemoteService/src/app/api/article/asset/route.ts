import { ArticleService } from "@/app/services/articleService";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  var articleId = params.get("articleId");
  var assetName = params.get("assetName");

  const asset = await ArticleService.getInstance().getAsset(
    articleId as string,
    assetName as string
  );

  if (asset !== undefined) {
    return new NextResponse(asset?.blob, {
      headers: {
        "Content-Type": asset?.contentType ?? "application/octet-stream",
      },
    });
  } else {
    notFound();
  }
}
