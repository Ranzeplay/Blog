import { CategoryService, CreateCategoryViewModel } from "@/lib/blog/category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body) as CreateCategoryViewModel;
      const result = await CategoryService.create(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Unable to create category" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
