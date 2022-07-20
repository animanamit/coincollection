import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coinage } = req.body;

  try {
    const watchListCoins = await prisma.coin.findMany({
      where: {
        coinage: coinage,
        status: "wishlist",
      },
    });
    console.log("success!!!!!");
    console.log(watchListCoins);
    return res.status(200).json({ watchListCoins });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
