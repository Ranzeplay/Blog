import { CategoryService, CreateCategoryViewModel } from "@/lib/blog/category";
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
    const data = req.body as CreateCategoryViewModel;
    const result = await CategoryService.create(data);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create category" });
  }
}
