// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchUserList } from "../../../services/api";

type List = {
  todo: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<List>
) {
  const list = await fetchUserList(req.query.username as string);
  res.status(200).json(list.data);
}
