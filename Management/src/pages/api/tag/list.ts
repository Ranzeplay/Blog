import { TagService } from '@/lib/blog/tag';
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
		const tags = await TagService.list();
		res.status(200).json(tags);
	} catch (error) {
		res.status(500).json({ error: 'Unable to fetch tags' });
	}
}