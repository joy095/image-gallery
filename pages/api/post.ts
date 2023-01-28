import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "John Doe" });
  const { description, image } = JSON.parse(req.body);
  const user = await prisma.post.create({
    data: {
      description: description,
      image: image,
    },
  });
  return res.status(201).json(user);
}
