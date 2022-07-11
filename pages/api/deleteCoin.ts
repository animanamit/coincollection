import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  try {
    await prisma.coin.delete({
      where: {
        id: id,
      },
    });
    console.log("success!!!!!");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
