import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coinageName, filters, status } = req.body;

  let filterObj: any = [];

  console.log(filters);

  filters?.forEach((item: string) => {
    filterObj.push({
      ruler: item,
    });
  });

  console.log(filterObj);

  try {
    if (filterObj.length === 0) {
      const filteredCoins = await prisma.coin.findMany({
        where: {
          coinage: coinageName,
          status: status,
        },
        include: {
          sets: true,
        },
      });
      console.log(filteredCoins);

      return res.status(200).json({ filteredCoins });
    } else {
      const filteredCoins = await prisma.coin.findMany({
        where: {
          coinage: coinageName,
          OR: [...filterObj],
          status: status,
        },
        include: {
          sets: true,
        },
      });

      console.log(filteredCoins);

      return res.status(200).json({ filteredCoins });
    }
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}
