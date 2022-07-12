import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coinId } = req.body;

  try {
    const coinToEdit = await prisma.coin.findFirst({
      where: {
        coinId: coinId,
      },
    });
    return res.status(200).json({ coinToEdit });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
