import { ArticleService } from '@/lib/blog/article';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET');
		res.status(405).end('Method Not Allowed');
		return;
	}

	const { slug } = req.query;

	try {
		const article = await ArticleService.get(slug as string);
		if (!article) {
			res.status(404).json({ error: 'Article not found' });
			return;
		}
		res.status(200).json(article);
	} catch (error) {
		res.status(500).json({ error: 'Unable to fetch article' });
	}
}