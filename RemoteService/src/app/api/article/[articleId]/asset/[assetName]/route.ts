import { ArticleService } from "@/app/services/articleService";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { articleId: string; assetName: string } }
) {
  const asset = await ArticleService.getInstance().getAsset(
    params.articleId as string,
    params.assetName as string
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
