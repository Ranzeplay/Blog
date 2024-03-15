import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    if (req.body.token === process.env.LOGIN_PASSWORD) {
      let cookie = `token=${bcrypt.hashSync(req.body.token)}; Path=/; HttpOnly; SameSite=Strict;`;
      res.setHeader("Set-Cookie", cookie);

      res.status(200).write("Login success.");
    } else {
      res.status(401).write("Login failed.");
    }
  } else {
    res.status(405).write("Only support POST method.");
  }

  res.end();
}
