import { TagService, CreateTagViewModel } from "@/lib/blog/tag";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
		return;
	}

	try {
		console.log(req.body);
		const data = req.body as CreateTagViewModel;
		const result = await TagService.create(data);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Unable to create tag" });
	}
}