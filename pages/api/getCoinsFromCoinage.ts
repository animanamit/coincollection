import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coinageName } = req.body;

  try {
    const filteredCoins = await prisma.coin.findMany({
      where: {
        coinage: coinageName,
        status: "owned",
      },
      include: {
        sets: true,
      },
    });

    return res.status(200).json({ filteredCoins });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
