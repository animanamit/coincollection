import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coinageName } = req.body;

  try {
    const rulers = await prisma.coin.findMany({
      where: {
        coinage: coinageName,
      },
      select: {
        ruler: true,
      },
    });

    return res.status(200).json({ rulers });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
