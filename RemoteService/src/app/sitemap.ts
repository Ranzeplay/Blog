import { MetadataRoute } from "next";
import { ArticleService } from "./services/articleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	var articles = await ArticleService.getInstance().getArticleIndex();

	var pages: MetadataRoute.Sitemap = [
		{
			url: '/',
			changeFrequency: 'monthly',
			lastModified: new Date()
		},
		{
			url: '/whoami',
			changeFrequency: 'monthly',
			lastModified: new Date()
		},
		{
			url: '/home',
			changeFrequency: 'daily',
			lastModified: new Date()
		},
		{
			url: '/browse',
			changeFrequency: 'daily',
			lastModified: new Date()
		},
	];

	articles?.forEach(article => {
		pages.push({
			url: `/article/${article.id}/read`,
			changeFrequency: 'daily',
			lastModified: article.publishTime
		});
	});

	return pages;
}