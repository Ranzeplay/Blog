import { CategoryService } from '@/lib/blog/category';
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

	try {
		const categories = await CategoryService.list();
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ error: 'Unable to fetch categories' });
	}
}